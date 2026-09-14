import jwt
import datetime
from flask import Blueprint, request, jsonify, make_response, current_app
from src.use_cases.user_pf_use_case.login_employee_use_case import employee_login_use_case

blueprint_login_employee = Blueprint('blueprint_login_employee', __name__)

@blueprint_login_employee.route('/login_employee', methods=['POST'])
def login_employee():
    brute_data = request.get_json()

    response_data, status_code = employee_login_use_case(brute_data)
    print(f"Response Data: {response_data}")

    response = make_response(jsonify(response_data))

    if status_code == 201:
        payload = {
            "employee_name": response_data['employee_name'],
            "employee_lastname": response_data['employee_lastname'],
            "employee_function": response_data['employee_function'],
            "employee_department": response_data['employee_department'],
            "employee_enterprise": response_data['employee_enterprise'],
            "employee_email": response_data['employee_email'],
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