from src.use_cases.confirmed_password import compare_passwords
from src.domain.validation.validation_email import validate_email
from src.infrastructure.external_services.crypted_password import hash_password
from src.infrastructure.external_services.id_generation import generate_id
from src.domain.user_pf_domain.employee_entity import entity_employee
from src.infrastructure.repository.user_pf_repository.create_employee_repository import create_employee_repository

def create_user_pf(data):

    data['id'] = generate_id()

    if compare_passwords(data['password'], data['confirmed_password']) == False:
        return {"message": "Passwords do not match"}, 400

    if validate_email(data['email']) == False:
        return {"message": "Invalid email format"}, 400
    
    password_hash = hash_password(data['password'])

    data['password'] = password_hash

    employee_entity = entity_employee(data)

    if create_employee_repository(employee_entity) == False:
        return {"message": "Error creating employee"}, 500
    else:
        return {
            "message": "Employee created successfully",
            "data": employee_entity
        }, 201
