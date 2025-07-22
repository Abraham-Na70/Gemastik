from pydantic import BaseModel

class LogInterviewSchema(BaseModel):
    interview_id: str

    class Config:
        extra = "allow"


