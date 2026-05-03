from sqlalchemy import Column, String, JSON, DateTime
from sqlalchemy.sql import func
from database import Base

class ProblemSet(Base):
    __tablename__ = "problem_sets"

    id = Column(String, primary_key=True, index=True)
    operation = Column(String, index=True)
    problems_data = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
