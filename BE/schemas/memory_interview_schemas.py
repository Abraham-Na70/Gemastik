from pydantic import BaseModel

class MemoryInterviewSchema(BaseModel):
    interview_id: str

class MemoryInterviewUpdateSchema(BaseModel):
    summary: str

class MemoryInterviewUpdateQuestionSchema(BaseModel):
    answered_question: str