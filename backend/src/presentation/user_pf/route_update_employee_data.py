from flask import Blueprint, jsonify, make_response, request
from src.presentation.middlewares.auth_middleware import token_pf_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.user_pf_use_case.update_employee_data_use_case import update_employee_data_use_case

blueprint_update_employee_data = Blueprint('blueprint_update_employee_data', __name__)

@blueprint_update_employee_data.route('/update_employee_data', methods=['PUT'])
@token_pf_obrigatorio 
def update_employee_data(dados_token):
    
    email = dados_token['employee_email']
    data_updated = request.get_json()

    response, status_code = update_employee_data_use_case(email, data_updated)

    response = make_response(jsonify(response), status_code)

    return response