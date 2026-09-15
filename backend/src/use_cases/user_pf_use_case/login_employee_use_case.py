from src.domain.validation.validation_email import validate_email
from src.infrastructure.external_services.verify_password import verify_password_email
from src.infrastructure.repository.user_pf_repository.select_state_user import select_state_user

def employee_login_use_case(data):

    if data.get('email') is None or data.get('password') is None:
        return {"message": "CNPJ and password are required"}, 400

    if validate_email(data['email']) == False:
        return {"message": "Invalid EMAIL format"}, 400

    employee_data = select_state_user(data['email'])

    if not employee_data:
        return {"message": "Usuário não encontrado."}, 404

    # 2. Verifica o STATUS do usuário (sem precisar ir no banco de novo)
    if employee_data['state_user'] == 'Pending':
        return {"message": "O usuário ainda não foi aceito pela empresa."}, 403
        
    if employee_data['state_user'] == 'Inactive':
        return {"message": "Sua conta foi inativada."}, 403


    if verify_password_email(data['password'], data) == False:
        return {"message": "Invalid password"}, 401
    else:
        return {
            "employee_email": employee_data['email_user']
        }, 201
