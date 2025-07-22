from flask import Blueprint

from controllers.log_interview_controller import (
    index,
    show_id,
    store,
    update,
    delete,
)

log_interview_routes = Blueprint('log_interview_routes', __name__)

log_interview_routes.route('/', methods=['GET'])(index)  # untuk dapat lihat semua log interview
log_interview_routes.route('/<id>', methods=['GET'])(show_id)  # untuk dapat lihat log interview sesuai id
log_interview_routes.route('/', methods=['POST'])(store)  # untuk buat log interview
log_interview_routes.route('/<id>', methods=['PUT'])(update)  # untuk update log interview
log_interview_routes.route('/<id>', methods=['DELETE'])(delete)  # untuk delete log interview