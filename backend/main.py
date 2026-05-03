from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from nanoid import generate
from typing import List

import models, schemas, database
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="MathHelper API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Welcome to the MathHelper API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

@app.post("/api/problem-sets", response_model=schemas.ProblemSet)
def create_problem_set(problem_set: schemas.ProblemSetCreate, db: Session = Depends(get_db)):
    # Generate a short unique ID (8 characters)
    hash_id = generate(size=10)
    
    db_problem_set = models.ProblemSet(
        id=hash_id,
        operation=problem_set.operation,
        problems_data=problem_set.problems_data
    )
    
    db.add(db_problem_set)
    db.commit()
    db.refresh(db_problem_set)
    return db_problem_set

@app.get("/api/problem-sets/{hash_id}", response_model=schemas.ProblemSet)
def read_problem_set(hash_id: str, db: Session = Depends(get_db)):
    db_problem_set = db.query(models.ProblemSet).filter(models.ProblemSet.id == hash_id).first()
    if db_problem_set is None:
        raise HTTPException(status_code=404, detail="Problem set not found")
    return db_problem_set
