from extensions.mongo import mongo 
from bson import ObjectId
from bson.errors import InvalidId

class CompanyModel:
    @staticmethod
    def index():
        companies = list(mongo.db.company.find())
        # --- THIS LOOP IS THE FIX ---
        # It converts the complex ObjectId to a simple string for each company
        for company in companies:
            company['_id'] = str(company['_id'])
        return companies
    
    @staticmethod
    def create_company(name, description):
        company_data = {
            'name': name,
            'description': description,
        }
        result = mongo.db.company.insert_one(company_data)
        new_company = mongo.db.company.find_one({'_id': result.inserted_id})
        if new_company:
            new_company['_id'] = str(new_company['_id'])
        return new_company
    
    @staticmethod
    def get_company_by_id(id):
        try :
            obj_id = ObjectId(id)
            company = mongo.db.company.find_one({'_id': obj_id})
            if company:
                company['_id'] = str(company['_id'])
            return company
        except (InvalidId, TypeError):
            return None
        
    @staticmethod
    def delete_company_by_id(id):
        try:
            result = mongo.db.company.delete_one({'_id': ObjectId(id)})
            return result.deleted_count > 0
        except InvalidId:
            return False
        
    @staticmethod
    def update_company_by_id(id, update_data):
        try:
            result = mongo.db.company.update_one(
                {'_id': ObjectId(id)},
                {'$set': update_data}
            )
            return result.modified_count > 0
        except InvalidId:
            return False