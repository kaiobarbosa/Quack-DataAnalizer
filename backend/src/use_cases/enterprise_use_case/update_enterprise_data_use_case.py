from src.domain.enterprise_domain.entity_enterprise import entity_enterprise_update
from src.domain.validation.validation_cnpj import validate_cnpj
from src.domain.validation.validation_email import validate_email
from src.infrastructure.repository.enterprise_repository.update_enterprise_repository import update_enterprise_repository

def update_enterprise_data_use_case(cnpj, data):

    if validate_cnpj(data['cnpj']) == False:
        return {"message":"Invalid CNPJ format"}, 400

    if validate_email(data['email']) == False:
        return {"message": "Invalid email format"}, 400

    data_entity = entity_enterprise_update(data)
    print(data_entity)
      
    if update_enterprise_repository(data_entity, cnpj) == False:
        return {"message": "Error updated enterprise"}, 500
    else:
        return {
            "message": "enterprise updated successfully",
            "data": data_entity
        }, 201
