from extensions.mongo import mongo
from bson import ObjectId
from bson.errors import InvalidId

class MemoryInterviewModel:
    @staticmethod
    def show():
        memory = list(mongo.db.memory_interview.find())
        return memory
    
    @staticmethod
    def show_id(id):
        try:
            memory = mongo.db.memory_interview.find_one({'interview_id': id})
            return memory
        except (InvalidId, TypeError):
            return None
        
    def store(id):
        try:
            data = {
                "interview_id" : id,
                "summary" : "",
                "answered_question" : [],
            }
            mongo.db.memory_interview.insert_one(data)
        except InvalidId:
            # Handle the case where the id is not a valid ObjectId
            return None
        return data
    
    def update(id, data):
        try:
            result = mongo.db.memory_interview.update_one(
                {'interview_id': id},
                {'$set': data}
            )
            return result.modified_count > 0
        except InvalidId:
            # Handle the case where the id is not a valid ObjectId
            return False
        
    def delete(id):
        try:
            result = mongo.db.memory_interview.delete_one({'_id': ObjectId(id)})
            return result.deleted_count > 0
        except InvalidId:
            return False
        
    def append_data(id, data):
        try:
            result = mongo.db.memory_interview.update_one(
                {'interview_id': id},
                {'$push': data}
            )
            return result.modified_count > 0
        except InvalidId:
            return False