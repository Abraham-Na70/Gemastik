from flask import jsonify, request
from models.interview_model import InterviewModel
from models.log_interview_model import LogInterviewModel
from models.memory_interview_model import MemoryInterviewModel
from schemas.interview_schemas import InterviewSchema, InterviewUpdateSchema

def index():
    data = InterviewModel.show()
    return jsonify(message="Data berhasil di raih", data=data), 200

def show_id(id):
    interview = InterviewModel.show_id(id)
    if not interview:
        return jsonify(message="Interview not found", id=id, interview=interview), 404
    return jsonify(message="Interview found", data=interview), 200

def show_user(user_id):
    interview = InterviewModel.show_user(user_id)
    if not interview:
        return jsonify(message="Interview not found", id=user_id, interview=interview), 404
    return jsonify(message="Interview Found", data=interview),200

def create():
    data = InterviewSchema(**request.json)
    interview_id = InterviewModel.store(data.user_id, data.job_id)

    if not interview_id:
        return jsonify(message="Failed to create interview"), 500

    LogInterviewModel.store(interview_id)
    MemoryInterviewModel.store(interview_id)

    return jsonify(message="Interview created successfully", data={
        "interview_id": interview_id,
        "user_id": data.user_id,
        "job_id": data.job_id
    }), 201
def update(id):
    interview = InterviewModel.show_id(id)
    if not interview:
        return jsonify(message="Interview not found", id=id, interview=interview), 404
    data = InterviewUpdateSchema(**request.json)
    InterviewModel.update(id, data.dict(exclude_unset=True))
    return jsonify(message="Update Interview Succesfully"), 200

def delete(id):
    interview = InterviewModel.show_id(id)
    if not interview:
        return jsonify(message="Interview not found", id=id, interview=interview), 404
    InterviewModel.delete(id)
    return jsonify(message="Interview deleted successfully"), 200
