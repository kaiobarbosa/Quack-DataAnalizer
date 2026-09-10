from src.infrastructure.external_services.id_generation import generate_id
from src.domain.department_domain.entity_department import entity_department
from src.infrastructure.repository.department_repository.create_department import create_department_repository

def create_department(data):

    data['id_department'] = generate_id() 

    department_entity = entity_department(data) #department_id, department_name e enterprise_id

    print("route data", data)
    print("use case data", department_entity)

    if create_department_repository(department_entity) == False:
        return {"message": "Error creating department"}, 500
    else:
        return {
            "message": "Department created successfully",
            "data": department_entity
        }, 201
