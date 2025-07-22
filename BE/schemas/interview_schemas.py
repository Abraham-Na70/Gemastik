from pydantic import BaseModel
from typing import Optional

class InterviewSchema(BaseModel):
    user_id: str
    job_id: str

class InterviewUpdateSchema(BaseModel):
    user_id: Optional[str] = None
    job_id: Optional[str] = None
    status: Optional[str] = None

    class Config:
        extra = "allow"