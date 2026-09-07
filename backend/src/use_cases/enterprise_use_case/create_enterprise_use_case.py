from src.use_cases.confirmed_password import compare_passwords
from src.domain.enterprise_domain.validation_email import validate_email
from src.domain.enterprise_domain.validation_cnpj import validate_cnpj

def create_enterprise(data):

    if compare_passwords(data['password'], data['confirm_password']) == False:
        return {"message": "Passwords do not match"}, 400

    if validate_email(data['email']) == False:
        return {"message": "Invalid email format"}, 400
    
    if validate_cnpj(data['cnpj']) == False:
        return {"message": "Invalid CNPJ format"}, 400

    return {
        "message": "Enterprise created successfully",
        "data": data
    }, 201
