from flask import Blueprint, request, jsonify
from src.use_cases.enterprise_use_case.create_enterprise_use_case import create_enterprise

blueprint_create_enterprise = Blueprint('blueprint_create_enterprise', __name__)

@blueprint_create_enterprise.route('/create_enterprise', methods=['POST'])
def insert_enterprise():
    brute_data = request.get_json()

    # Desempacota a resposta do use case (dicionário e status code)
    response_data, status_code = create_enterprise(brute_data)

    # O jsonify transforma o dicionário em JSON para o frontend
    return jsonify(response_data), status_code
