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
            'enterprise_cnpj': response_data.get('cnpj'), 
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

        # Acopla no cookie (Para a Web)
        response.set_cookie('access_token', value=token, httponly=True, samesite='Lax', secure=False)
        
        # ATUALIZAÇÃO: Envia também no JSON da resposta (Para o Electron)
        response_data['token'] = token 
        
        # Atualiza a resposta com o novo JSON que agora tem o token
        response.data = jsonify(response_data).data 

    return response