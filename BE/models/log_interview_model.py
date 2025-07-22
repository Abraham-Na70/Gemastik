from extensions.mongo import mongo
from bson import ObjectId
from bson.errors import InvalidId

class LogInterviewModel:
    @staticmethod
    def show():
        log_interview = list(mongo.db.log_interview.find())
        return log_interview
    
    @staticmethod
    def show_id(id):
        try:
            # obj_id = ObjectId(id)
            log_interview = mongo.db.log_interview.find_one({'interview_id': id})
            return log_interview
        except (InvalidId, TypeError):
            return None
        
    @staticmethod
    def store(id):
        try:
            data = {
                "interview_id" : id,
                "chat" : []
            }
            mongo.db.log_interview.insert_one(data)
        except InvalidId:
            # Handle the case where the id is not a valid ObjectId
            return None
    
    @staticmethod
    def update(id, data):
        try:
            result = mongo.db.log_interview.update_one(
                {'interview_id': id},
                {'$set': data}
            )
            return result.modified_count > 0
        except:
            return False
        
    @staticmethod
    def append_data(id, data):
        try:
            result = mongo.db.log_interview.update_one(
                {'interview_id': id},
                {'$push': {'chat': data}}
            )
            return result.modified_count > 0
        except InvalidId:
            return False
        
    @staticmethod
    def delete(id):
        try:
            result = mongo.db.log_interview.delete_one({'_id': ObjectId(id)})
            return result.deleted_count > 0
        except InvalidId:
            return False
