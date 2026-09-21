from flask import Blueprint, jsonify, make_response, request
from src.presentation.middlewares.auth_middleware import token_pj_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.enterprise_use_case.update_enterprise_data_use_case import update_enterprise_data_use_case

blueprint_update_enterprise_data = Blueprint('blueprint_update_enterprise_data', __name__)

@blueprint_update_enterprise_data.route('/update_enterprise_data', methods=['PUT'])
@token_pj_obrigatorio 
def update_enterprise_data(dados_token):
    
    cnpj = dados_token['enterprise_cnpj']
    data_updated = request.get_json()

    print(data_updated)

    response, status_code = update_enterprise_data_use_case(cnpj, data_updated)

    response = make_response(jsonify(response), status_code)

    return response