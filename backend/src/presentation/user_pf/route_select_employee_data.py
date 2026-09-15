from flask import Blueprint, jsonify, make_response
from src.presentation.middlewares.auth_middleware import token_pf_obrigatorio # Ajuste o caminho se necessário
from src.use_cases.user_pf_use_case.select_employee_data_use_case import select_employee_data_use_case

blueprint_select_employee_data = Blueprint('blueprint_select_employee_data', __name__)

# ADICIONE O 'OPTIONS' AQUI NA LISTA DE MÉTODOS!
@blueprint_select_employee_data.route('/select_employee_data', methods=['GET', 'OPTIONS'])
@token_pf_obrigatorio
def select_employee_data(dados_token):
    
    # ATENÇÃO AQUI: Busca pela chave correta que você guardou no token de login!
    email_logado = dados_token.get('employee_email') 

    print(f'Email que fez a requisição: {email_logado}')

    response_entity, status_code = select_employee_data_use_case(email_logado)

    response = make_response(jsonify(response_entity), status_code)

    return response
