import jwt
import datetime
from flask import Blueprint, request, jsonify, make_response, current_app
from src.use_cases.enterprise_use_case.login_enterprise_use_case import enterprise_login

blueprint_login_enterprise = Blueprint('blueprint_login_enterprise', __name__)

@blueprint_login_enterprise.route('/login_enterprise', methods=['POST'])
def login_enterprise():
    brute_data = request.get_json()

    response_data, status_code = enterprise_login(brute_data)

    response = make_response(jsonify(response_data))

    if status_code == 201:
        
        payload = {
            'enterprise_cnpj': response_data.get('enterprise_cnpj'), 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }

        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

        response.set_cookie(
            'access_token',
            value=token,
            httponly=True,
            samesite='Lax',
            secure=False 
        )

    return response