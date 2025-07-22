from flask import Blueprint
from controllers.auth_controller import login, register, index

auth_routes = Blueprint('auth_routes', __name__)

auth_routes.route('/login', methods=['POST'])(login)
auth_routes.route('/register', methods=['POST'])(register)
auth_routes.route('/', methods=['GET'])(index)