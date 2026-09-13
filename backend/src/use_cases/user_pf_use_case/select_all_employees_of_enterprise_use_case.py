from src.infrastructure.repository.user_pf_repository.select_all_employess_of_enterprise_repository import select_all_employees_of_enterprise
from src.domain.user_pf_domain.entity_requests import entity_requests

def select_all_employees_of_enterprise_use_case(cnpj):

    all_requests_data = select_all_employees_of_enterprise(cnpj)
    
    if not all_requests_data:
        return {"message": "Não foi encontrado nenhum funcionário"}, 404

    # SOLUÇÃO: Passar cada item da lista individualmente para a entidade
    employees_entity = [entity_requests(request) for request in all_requests_data]

    return {
        "entity": employees_entity
    }, 200
