from flask import jsonify, request

from models.company_model import CompanyModel
from models.jobs_model import JobsModel
from schemas.company_schemas import CompanySchemas

def index():
    # Simulate a home page
    data = CompanyModel.index()
    return jsonify(message="Data berhasil di raih", data=data), 200

def create_company():
    data = CompanySchemas(**request.json)

    CompanyModel.create_company(data.name, data.description)
    return jsonify(message="Company created successfully", data = data), 201

def get_company_by_id(id):
    # Simulate fetching a company by ID from the database
    company = CompanyModel.get_company_by_id(id)
    if not company:
        return jsonify(message="Company not found", id=id, company=company), 404
    return jsonify(message="Company found", data=company), 200

def delete_company_by_id(id):
    # Simulate deleting a company by ID from the database
    company = CompanyModel.get_company_by_id(id)
    if not company:
        return jsonify(message="Company not found", id=id, company=company), 404
    CompanyModel.delete_company_by_id(id)
    JobsModel.delete_job_by_company(id)
    return jsonify(message="Company deleted successfully"), 200

def update_company_by_id(id):
    company = CompanyModel.get_company_by_id(id)
    if not company:
        return jsonify(message="Company not found", id=id, company=company), 404
    data = CompanySchemas(**request.json)
    CompanyModel.update_company_by_id(id, data.dict())
    return jsonify(message="Update Company Succesfully"), 200