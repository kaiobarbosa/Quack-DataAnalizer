from flask import Blueprint, request, jsonify
from src.use_cases.user_pf_use_case.create_user_pf_use_case import create_user_pf

blueprint_create_user_pf = Blueprint('blueprint_create_user_pf', __name__)

@blueprint_create_user_pf.route('/create_employee_account', methods=['POST'])
def insert_enterprise():
    brute_data = request.get_json()

    # Desempacota a resposta do use case (dicionário e status code)
    response_data, status_code = create_user_pf(brute_data)

    # O jsonify transforma o dicionário em JSON para o frontend
    return jsonify(response_data), status_code
