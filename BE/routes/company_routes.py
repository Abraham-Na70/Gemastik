from flask import Blueprint
from controllers.company_controller import (
    index,
    create_company,
    get_company_by_id,
    delete_company_by_id,
    update_company_by_id
)

company_routes = Blueprint('company_routes', __name__)

company_routes.route('/', methods=['GET'])(index)
company_routes.route('/', methods=['POST'])(create_company)
company_routes.route('/id/<id>', methods=['GET'])(get_company_by_id)
company_routes.route('/id/<id>', methods=['DELETE'])(delete_company_by_id)
company_routes.route('/id/<id>', methods=['PUT'])(update_company_by_id)