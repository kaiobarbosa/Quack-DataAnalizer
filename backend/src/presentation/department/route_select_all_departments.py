from flask import Blueprint, jsonify, make_response
from src.presentation.middlewares.auth_middleware import token_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.department_use_case.select_all_departments_use_case import select_all_departments_use_case

blueprint_select_all_departments = Blueprint('blueprint_select_all_departments', __name__)

@blueprint_select_all_departments.route('/select_all_departments', methods=['GET'])
@token_obrigatorio  # <-- Coloque o decorador AQUI (sempre abaixo do @route)
def select_all_departments(dados_token):
    
    cnpj_logado = dados_token.get('enterprise_cnpj')

    print(f'CNPJ que fez a requisição dos departamentos: {cnpj_logado}')

    response_all_departments, status_code = select_all_departments_use_case(cnpj_logado)
    print(response_all_departments)

    response = make_response(jsonify(response_all_departments), status_code)

    return response