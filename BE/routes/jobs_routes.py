from flask import Blueprint, jsonify, request

from controllers.jobs_controller import (
    index, 
    create_job, 
    get_job_by_id, 
    delete_job_by_id,
    update_job_by_id
)

jobs_routes = Blueprint('jobs_routes', __name__)

jobs_routes.route('/', methods=['GET'])(index)
jobs_routes.route('/', methods=['POST'])(create_job)
jobs_routes.route('/id/<id>', methods=['GET'])(get_job_by_id)
jobs_routes.route('/id/<id>', methods=['DELETE'])(delete_job_by_id)
jobs_routes.route('/id/<id>', methods=['PUT'])(update_job_by_id)