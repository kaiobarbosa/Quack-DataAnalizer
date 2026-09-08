from flask import Blueprint, request, jsonify
from src.use_cases.enterprise_use_case.login_enterprise_use_case import enterprise_login

blueprint_login_enterprise = Blueprint('blueprint_login_enterprise', __name__)

@blueprint_login_enterprise.route('/login_enterprise', methods=['POST'])
def login_enterprise():
    brute_data = request.get_json()

    print('Dados recebidos no endpoint /login_enterprise:', brute_data)

    # Desempacota a resposta do use case (dicionário e status code)
    response_data, status_code = enterprise_login(brute_data)

    # O jsonify transforma o dicionário em JSON para o frontend
    return jsonify(response_data), status_code