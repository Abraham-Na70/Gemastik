from extensions.mongo import mongo
from werkzeug.security import generate_password_hash, check_password_hash

class AuthModel:
    @staticmethod
    def create_user(username, password):
        # Simulate user creation
        user = {
            'username': username,
            'password': generate_password_hash(password)
        }
        mongo.db.users.insert_one(user).inserted_id
        return user
    
    @staticmethod
    def verify_user(username, password):
        # Simulate user verification
        user = mongo.db.users.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            return True
        return False
        pass

    @staticmethod
    def user_exists(username):
        # Check if a user with the given username exists in the database
        # return mongo.db.users.find_one({'username': username}) is not None
        user = mongo.db.users.find_one({'username': username})
        return user is not None