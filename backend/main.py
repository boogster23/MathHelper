from fastapi import FastAPI

app = FastAPI(title="MathHelper API")

@app.get("/")
async def root():
    return {"message": "Welcome to the MathHelper API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
