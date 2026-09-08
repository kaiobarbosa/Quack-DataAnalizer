from src.use_cases.confirmed_password import compare_passwords
from src.domain.enterprise_domain.validation_enterprise.validation_email import validate_email
from src.domain.enterprise_domain.validation_enterprise.validation_cnpj import validate_cnpj
from src.infrastructure.external_services.crypted_password import hash_password
from src.infrastructure.external_services.id_generation import generate_id
from src.domain.enterprise_domain.entity_enterprise import entity_enterprise
from src.infrastructure.repository.enterprise_repository.create_enterprise import create_enterprise_repository

def create_enterprise(data):

    data['id'] = generate_id()

    if compare_passwords(data['password'], data['confirm_password']) == False:
        return {"message": "Passwords do not match"}, 400

    if validate_email(data['email']) == False:
        return {"message": "Invalid email format"}, 400
    
    if validate_cnpj(data['cnpj']) == False:
        return {"message": "Invalid CNPJ format"}, 400

    password_hash = hash_password(data['password'])

    data['password'] = password_hash

    enterprise_entity = entity_enterprise(data)

    if create_enterprise_repository(enterprise_entity) == False:
        return {"message": "Error creating enterprise"}, 500
    else:
        return {
            "message": "Enterprise created successfully",
            "data": enterprise_entity
        }, 201
