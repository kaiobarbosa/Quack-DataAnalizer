from src.domain.user_pf_domain.employee_entity import entity_employee_update
from src.domain.validation.validation_email import validate_email
from src.infrastructure.repository.user_pf_repository.update_employee_repository import update_employee_repository

def update_employee_data_use_case(email, data):

    data_entity = entity_employee_update(data)

    if validate_email(data['email']) == False:
        return {"message": "Invalid email format"}, 400

    if update_employee_repository(data_entity, email) == False:
        return {"message": "Error updated employee"}, 500
    else:
        return {
            "message": "Employee updated successfully",
            "data": data_entity
        }, 201
