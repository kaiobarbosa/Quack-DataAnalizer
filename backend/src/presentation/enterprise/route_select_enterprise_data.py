from flask import Blueprint, jsonify, make_response
from src.presentation.middlewares.auth_middleware import token_obrigatorio # Importe de onde você salvou o arquivo
from src.use_cases.enterprise_use_case.select_enterprise_data_use_case import select_enterprise_data_use_case

blueprint_select_enterprise_data = Blueprint('blueprint_select_enterprise_data', __name__)

@blueprint_select_enterprise_data.route('/select_enterprise_data', methods=['GET'])
@token_obrigatorio  # <-- Coloque o decorador AQUI (sempre abaixo do @route)
def select_enterprise_data(dados_token):
    
    print(f'Dados do token decodificado: {dados_token}')  # Adicione esta linha para depuração
    
    cnpj_logado = dados_token.get('enterprise_cnpj')

    print(f'CNPJ que fez a requisição: {cnpj_logado}')

    response_entity, status_code = select_enterprise_data_use_case(cnpj_logado)

    response = make_response(jsonify(response_entity), status_code)

    return response