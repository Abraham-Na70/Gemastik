from extensions.mongo import mongo
from bson import ObjectId
from bson.errors import InvalidId

class InterviewModel:

    @staticmethod
    def show():
        interviews = list(mongo.db.interview.find())
        # Convert ObjectId to string for each interview
        for interview in interviews:
            interview['_id'] = str(interview['_id'])
        return interviews
    
    @staticmethod
    def show_id(id):
        try:
            obj_id = ObjectId(id)
            interview = mongo.db.interview.find_one({'_id': obj_id})
            if interview:
                interview['_id'] = str(interview['_id'])
            return interview
        except (InvalidId, TypeError):
            return None
        
    @staticmethod
    def show_user(user_id):
        try:
            # find() returns a cursor, so we need to convert it to a list
            interviews = list(mongo.db.interview.find({'user_id': user_id}))
            # Convert ObjectId to string for each interview
            for interview in interviews:
                interview['_id'] = str(interview['_id'])
            return interviews
        except (InvalidId, TypeError):
            return None
        
    @staticmethod
    def store(user_id, job_id):
        try:
            data = {
                "user_id" : user_id,
                "job_id" : job_id,
                "status" : "not_started",
                "list_question" : [],
            }
            result = mongo.db.interview.insert_one(data)
            return str(result.inserted_id)
        except InvalidId:
            return None
        
    @staticmethod
    def update(id, data):
        try:
            result = mongo.db.interview.update_one(
                {'_id': ObjectId(id)},
                {'$set': data}
            )
            return result.modified_count > 0
        except InvalidId:
            return False
        
    @staticmethod
    def delete(id):
        try:
            result = mongo.db.interview.delete_one({'_id': ObjectId(id)})
            return result.deleted_count > 0
        except InvalidId:
            return False

