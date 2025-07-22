import os

class Config:
    MONGO_HOST = os.environ.get("MONGO_HOST", "localhost")
    MONGO_PORT = int(os.environ.get("MONGO_PORT", 27017))
    MONGO_DB = os.environ.get("MONGO_DB", "mydatabase")
    MONGO_URI = f"mongodb://{MONGO_HOST}:{MONGO_PORT}/{MONGO_DB}"
