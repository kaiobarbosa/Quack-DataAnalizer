from flask import Blueprint, jsonify, make_response
from src.presentation.middlewares.auth_middleware import token_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.user_pf_use_case.get_all_requests_use_case import get_all_requests_use_case

blueprint_get_all_requests = Blueprint('blueprint_get_all_requests', __name__)

@blueprint_get_all_requests.route('/get_all_requests', methods=['GET'])
@token_obrigatorio  # <-- Coloque o decorador AQUI (sempre abaixo do @route)
def get_all_requests(dados_token):
    
    cnpj_logado = dados_token.get('enterprise_cnpj')

    print(f'CNPJ que fez a requisição das requisicoes: {cnpj_logado}')

    response_entity, status_code = get_all_requests_use_case(cnpj_logado)

    response = make_response(jsonify(response_entity), status_code)

    return response