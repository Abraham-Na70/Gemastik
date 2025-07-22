from flask import jsonify, request
from models.memory_interview_model import MemoryInterviewModel
from schemas.memory_interview_schemas import MemoryInterviewSchema, MemoryInterviewUpdateSchema, MemoryInterviewUpdateQuestionSchema

def index():
    data = MemoryInterviewModel.show()
    return jsonify(message="Data berhasil di raih", data=data), 200

def show_id(id):
    memory_interview = MemoryInterviewModel.show_id(id)
    if not memory_interview:
        return jsonify(message="Memory Interview not found", id=id, memory_interview=memory_interview), 404
    return jsonify(message="Memory Interview found", data=memory_interview), 200

def store():
    data = MemoryInterviewSchema(**request.json)
    MemoryInterviewModel.store(data.interview_id)
    return jsonify(message="Memory Interview created successfully", data=data), 201

def update(id):
    memory_interview = MemoryInterviewModel.show_id(id)
    if not memory_interview:
        return jsonify(message="Memory Interview not found", id=id, memory_interview=memory_interview), 404
    data = MemoryInterviewUpdateSchema(**request.json)
    MemoryInterviewModel.update(id, data.dict())
    return jsonify(message="Update Memory Interview Succesfully"), 200

def delete(id):
    memory_interview = MemoryInterviewModel.show_id(id)
    if not memory_interview:
        return jsonify(message="Memory Interview not found", id=id, memory_interview=memory_interview), 404
    MemoryInterviewModel.delete(id)
    return jsonify(message="Memory Interview deleted successfully"), 200

def append_data(id):
    memory_interview = MemoryInterviewModel.show_id(id)
    if not memory_interview:
        return jsonify(message="Memory Interview not found", id=id, memory_interview=memory_interview), 404
    data = MemoryInterviewUpdateQuestionSchema(**request.json)
    MemoryInterviewModel.append_data(id, data.dict())
    return jsonify(message="Append Data Memory Interview Succesfully"), 200