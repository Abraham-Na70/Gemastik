from flask import jsonify, request
from models.jobs_model import JobsModel
from schemas.jobs_schemas import JobSchemas

def index():
    # Simulate a home page
    data = JobsModel.get_all_jobs()
    return jsonify(message="Data berhasil di raih", data = data), 200

def create_job():
    # Simulate a job creation process
    data = JobSchemas(**request.json)
    # Simulate saving the job to the database
    JobsModel.create_job(data.title, data.description, data.skills, data.company_id)
    return jsonify(message="Job created successfully"), 201

def get_job_by_id(id):
    # Simulate fetching a job by ID from the database
    job = JobsModel.get_job_by_id(id)
    if not job:
        return jsonify(message="Job not found", id = id, job = job), 404
    return jsonify(message="Job found", data=job), 200

def delete_job_by_id(id):
    # Simulate deleting a job by ID from the database
    job = JobsModel.get_job_by_id(id)
    if not job:
        return jsonify(message="Job not found", id = id, job = job), 404
    JobsModel.delete_job_by_id(id)
    return jsonify(message="Job deleted successfully"), 200

def update_job_by_id(id):
    # Simulate updating a job by ID in the database
    job = JobsModel.get_job_by_id(id)
    if not job:
        return jsonify(message="Job not found", id = id, job = job), 404
    data = JobSchemas(**request.json)
    JobsModel.update_job_by_id(id, data.dict())
    return jsonify(message="Job updated successfully"), 200