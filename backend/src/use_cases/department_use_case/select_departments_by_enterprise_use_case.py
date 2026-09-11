from src.infrastructure.repository.department_repository.get_all_departments_by_cnpj_repository import get_all_departments_by_cnpj

def select_departments_by_enterprise_use_case(cnpj):

    all_departments = get_all_departments_by_cnpj(cnpj)
    
    if not all_departments:
        return {"message": "Departamentos não encontrados"}, 404

    return {
        "entity": all_departments
    }, 200
