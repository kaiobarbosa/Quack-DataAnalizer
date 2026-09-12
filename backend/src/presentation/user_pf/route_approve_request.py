from flask import Blueprint, jsonify, make_response, request
from src.presentation.middlewares.auth_middleware import token_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.user_pf_use_case.approve_request_use_case import acept_user_use_case

blueprint_acept_user = Blueprint('blueprint_acept_user', __name__)

@blueprint_acept_user.route('/acept_user', methods=['POST'])
@token_obrigatorio  # <-- Coloque o decorador AQUI (sempre abaixo do @route)
def acept_user(dados_token):
    
    cnpj_logado = dados_token.get('enterprise_cnpj')
    dados_requisicao = request.get_json()
    id_user = dados_requisicao.get('id_user')


    print(f'CNPJ que fez a requisição das requisicoes: {cnpj_logado}')
    print(f'ID do usuário', {id_user})

    response_entity, status_code = acept_user_use_case(id_user, cnpj_logado)

    response = make_response(jsonify(response_entity), status_code)

    return response