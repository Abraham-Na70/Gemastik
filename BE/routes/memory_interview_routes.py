from flask import Blueprint

from controllers.memory_interview_controller import (
    index,
    show_id,
    store,
    update,
    delete,
    append_data
)

memory_interview_routes = Blueprint('memory_interview_routes', __name__)

memory_interview_routes.route('/', methods=['GET'])(index)  # untuk dapat lihat semua memory interview
memory_interview_routes.route('/<id>', methods=['GET'])(show_id)  # untuk dapat lihat memory interview sesuai id
memory_interview_routes.route('/', methods=['POST'])(store)  # untuk buat memory interview
memory_interview_routes.route('/<id>', methods=['PUT'])(update)  # untuk update memory interview
memory_interview_routes.route('/<id>/push', methods=['PUT'])(append_data)  # untuk update memory interview
memory_interview_routes.route('/<id>', methods=['DELETE'])(delete)  # untuk delete memory interview
