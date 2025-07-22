from pydantic import BaseModel

class RegisterSchemas(BaseModel):
    username: str
    # email: str
    password: str

class LoginSchemas(BaseModel):
    username: str
    password: str  