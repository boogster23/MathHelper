from pydantic import BaseModel
from typing import List, Dict, Any
from datetime import datetime

class ProblemSetBase(BaseModel):
    operation: str
    problems_data: List[Dict[str, Any]]

class ProblemSetCreate(ProblemSetBase):
    pass

class ProblemSet(ProblemSetBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
