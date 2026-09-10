from flask import Blueprint, jsonify, make_response, request
from src.presentation.middlewares.auth_middleware import token_obrigatorio 
from src.use_cases.department_use_case.create_department_use_case import create_department

blueprint_create_department = Blueprint('blueprint_create_department', __name__)

@blueprint_create_department.route('/create_department', methods=['POST'])
@token_obrigatorio
def insert_department(dados_token):

    brute_data = request.get_json()
    brute_data["cnpj_enterprise"] = dados_token["enterprise_cnpj"]

    # Desempacota a resposta do use case (dicionário e status code)
    response_data, status_code = create_department(brute_data)

    # O jsonify transforma o dicionário em JSON para o frontend
    return jsonify(response_data), status_code
