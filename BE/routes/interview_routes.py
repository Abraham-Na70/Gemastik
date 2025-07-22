from flask import Blueprint

from controllers.interview_controller import (
    index,
    show_id,
    show_user,
    create,
    update,
    delete
)
interview_routes = Blueprint('interview_routes', __name__)


# db interview
interview_routes.route('/', methods=['GET'])(index) # untuk dapat lihat semua interview
interview_routes.route('/<id>', methods=['GET'])(show_id)
interview_routes.route('/user/<user_id>', methods=['GET'])(show_user) # untuk dapat lihat interview sesuai user
interview_routes.route('/', methods=['POST'])(create) # untuk buat interview
interview_routes.route('/<id>', methods=['PUT'])(update) # untuk update interview
interview_routes.route('/<id>', methods=['DELETE'])(delete) # untuk delete interview

# db log
interview_routes.route('/id/<id>/chat', methods=['POST']) # untuk menambahkan chat ke dalam log sesuai id interview
interview_routes.route('/id/<id>/chat', methods=['GET']) # untuk dapat lihat interview sesuai id

# db memory
interview_routes.route('/id/<id>/memory', methods=['POST']) # untuk menambahkan memory ke dalam log sesuai id interview
interview_routes.route('/id/<id>/memory', methods=['GET']) # untuk dapat lihat interview sesuai id