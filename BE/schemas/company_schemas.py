from pydantic import BaseModel

class CompanySchemas(BaseModel):
    name: str
    description: str