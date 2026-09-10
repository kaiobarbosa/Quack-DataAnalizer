from src.infrastructure.repository.department_repository.get_all_departments_repository import get_all_departments

def select_all_departments_use_case(cnpj):

    all_departments = get_all_departments(cnpj)
    
    # Boa prática: Verificar se a empresa realmente foi encontrada no banco
    if not all_departments:
        return {"message": "Departamentos não encontrados"}, 404


    # Retorne apenas um dicionário comum do Python
    return {
        "entity": all_departments
    }, 200
