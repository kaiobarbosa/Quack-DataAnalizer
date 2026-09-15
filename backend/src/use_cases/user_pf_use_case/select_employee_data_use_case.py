from src.infrastructure.repository.user_pf_repository.select_employee_data_repository import get_employee_data
from src.domain.user_pf_domain.employee_entity import entity_employee_home
# Apaguei a importação do jsonify daqui!

def select_employee_data_use_case(email):

    employeee_all_data = get_employee_data(email)
    
    # Boa prática: Verificar se a empresa realmente foi encontrada no banco
    if not employeee_all_data:
        return {"message": "Usuario não encontrada"}, 404

    print(employeee_all_data)

    employee_entity = entity_employee_home(employeee_all_data)
    print(employee_entity)

    # Retorne apenas um dicionário comum do Python
    return {
        "entity": employee_entity
    }, 200
