from flask import Blueprint

from routes.auth_routes import auth_routes
from routes.jobs_routes import jobs_routes
from routes.company_routes import company_routes
from routes.interview_routes import interview_routes
from routes.log_interview_routes import log_interview_routes
from routes.memory_interview_routes import memory_interview_routes

api = Blueprint('api', __name__, url_prefix='/api')

api.register_blueprint(auth_routes, url_prefix='/auth')
api.register_blueprint(jobs_routes, url_prefix='/jobs')
api.register_blueprint(company_routes, url_prefix='/company')
api.register_blueprint(interview_routes, url_prefix='/interview')
api.register_blueprint(log_interview_routes, url_prefix='/interview/log')
api.register_blueprint(memory_interview_routes, url_prefix='/interview/memory')