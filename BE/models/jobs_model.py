from extensions.mongo import mongo
from bson import ObjectId
from bson.errors import InvalidId

class JobsModel:
    @staticmethod
    def get_all_jobs():
        # Simulate fetching all jobs from the database
        jobs = list(mongo.db.jobs.find())
        return jobs
    
    @staticmethod
    def get_job_by_id(job_id):
        try:
            # Ubah string jadi ObjectId
            obj_id = ObjectId(job_id)
            # Cari di MongoDB berdasarkan _id
            job = mongo.db.jobs.find_one({'_id': obj_id})
            return job
        except (InvalidId, TypeError):
            # Jika job_id tidak valid, kembalikan None
            return None
    
    @staticmethod
    def create_job(title, description, skills, company_id): 
        # Simulate creating a job in the database
        job = {
            'title': title,
            'description': description,
            'skills': skills,
            'company_id': company_id
        }
        mongo.db.jobs.insert_one(job)
        return job
    
    @staticmethod
    def delete_job_by_id(id):
        try:
            result = mongo.db.jobs.delete_one({'_id': ObjectId(id)})
            return result.deleted_count > 0
        except InvalidId:
            # Handle the case where the id is not a valid ObjectId
            return False
        pass

    @staticmethod
    def delete_job_by_company(id):
        try:
            result = mongo.db.jobs.delete_many({'company_id': id})
            return result.deleted_count > 0
        except InvalidId:
            return False

    @staticmethod
    def update_job_by_id(id, upadate_data):
        try:
            result = mongo.db.jobs.update_one(
                {'_id': ObjectId(id)},
                {'$set': upadate_data}
            )
            return result.modified_count > 0
        except (InvalidId, TypeError):
            raise InvalidId("Invalid ID format")