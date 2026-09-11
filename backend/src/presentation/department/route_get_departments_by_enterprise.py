from flask import Blueprint, jsonify, make_response, request
from src.use_cases.department_use_case.select_departments_by_enterprise_use_case import select_departments_by_enterprise_use_case

blueprint_select_departments_by_enterprise = Blueprint('blueprint_select_departments_by_enterprise', __name__)

@blueprint_select_departments_by_enterprise.route('/get_departments_by_enterprise', methods=['POST'])
def select_departments_by_enterprise():
    
    cnpj_logado = request.get_json()

    response_departments_by_enterprise, status_code = select_departments_by_enterprise_use_case(cnpj_logado)

    response = make_response(jsonify(response_departments_by_enterprise), status_code)

    return response