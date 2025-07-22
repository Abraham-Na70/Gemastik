from flask import request, jsonify
from models.log_interview_model import LogInterviewModel
from schemas.log_interview_schemas import LogInterviewSchema

def index():
    log = LogInterviewModel.show()
    return jsonify(message="Data berhasil di raih", data=log), 200

def show_id(id):
    data = LogInterviewModel.show_id(id)
    if not data:
        return jsonify(message="Log Interview not found", id=id, log=data), 404
    return jsonify(message="Log Interview found", data=data), 200

def store():
    data = LogInterviewSchema(**request.json)
    LogInterviewModel.store(data.interview_id)
    return jsonify(message="Log Interview created successfully", data=data), 201

def update(id):
    log = LogInterviewModel.show_id(id)
    if not log:
        return jsonify(message="Log Interview not found", id=id, log=log), 404
    data = request.json

    if 'sender' not in data or 'message' not in data:
        return jsonify(message="Sender is required"), 400
    
    print(f"Updating Log Interview with ID: {id}")
    print(f"Data received for update: {data}")

    chat_entry = {
        "sender": data['sender'],
        "message": data['message'],
        "elapsed_time" : data['elapsed_time'] if 'elapsed_time' in data else 0,
    }

    print(f"Chat entry: {chat_entry}")

    log_interview = LogInterviewModel.append_data(id, chat_entry)
    print(f"Log interview after update: {log_interview}")
    if not log_interview:
        return jsonify(message="Failed to update Log Interview"), 500
    
    return jsonify(message="Log Interview updated successfully"), 200

def delete(id):
    log = LogInterviewModel.show_id(id)
    if not log:
        return jsonify(message="Log Interview not found", id=id, log=log), 404
    LogInterviewModel.delete(id)
    return jsonify(message="Log Interview deleted successfully"), 200