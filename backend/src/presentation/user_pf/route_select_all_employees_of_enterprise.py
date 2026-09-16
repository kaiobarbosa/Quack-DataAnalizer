from flask import Blueprint, jsonify, make_response
from src.presentation.middlewares.auth_middleware import token_pj_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.user_pf_use_case.select_all_employees_of_enterprise_use_case import select_all_employees_of_enterprise_use_case

blueprint_select_all_employees_of_enterprise = Blueprint('blueprint_select_all_employees_of_enterprise', __name__)

@blueprint_select_all_employees_of_enterprise.route('/select_all_employees_of_enterprise', methods=['GET'])
@token_pj_obrigatorio  # <-- Coloque o decorador AQUI (sempre abaixo do @route)
def select_all_employees_of_enterprise(dados_token):
    
    cnpj_logado = dados_token.get('enterprise_cnpj')

    print(f'CNPJ que fez a requisição das requisicoes: {cnpj_logado}')

    response_entity, status_code = select_all_employees_of_enterprise_use_case(cnpj_logado)

    response = make_response(jsonify(response_entity), status_code)

    return response