from flask import Blueprint, jsonify, make_response
from src.use_cases.enterprise_use_case.select_all_enterprises_use_case import select_all_enterprises_use_case

blueprint_select_all_enterprises = Blueprint('blueprint_select_all_enterprises', __name__)

@blueprint_select_all_enterprises.route('/select_enterprise_exist', methods=['GET'])
def select_all_enterprises():
    response_enterprises, status_code = select_all_enterprises_use_case()

    response = make_response(jsonify(response_enterprises), status_code)

    return response