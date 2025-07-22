from pydantic import BaseModel

class JobSchemas(BaseModel):
    title: str
    description: str
    # salary: float
    skills: list[str]
    company_id: str

