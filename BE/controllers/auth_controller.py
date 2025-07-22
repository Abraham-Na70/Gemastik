from flask import jsonify, request
from models.auth_model import AuthModel
from schemas.auth_schemas import RegisterSchemas, LoginSchemas

def login():
    data = LoginSchemas(**request.json)
    is_exists = AuthModel.user_exists(data.username)
    if not is_exists:
        return jsonify(message="User does not exist"), 404
    is_verified = AuthModel.verify_user(data.username, data.password)
    if not is_verified:
        return jsonify(message="Invalid credentials"), 401
    return jsonify(message="Login successful"), 200

def register():
    # Simulate a registration process
    data = RegisterSchemas(**request.json)
    is_exists = AuthModel.user_exists(data.username)

    if is_exists:
        return jsonify(message="User already exists"), 409
    
    AuthModel.create_user(data.username, data.password)
    return jsonify(message="Registration successful"), 201
    
    
def index():
    # Simulate a home page
    return jsonify(message="Welcome to the home page"), 200