from src.infrastructure.repository.user_pf_repository.get_all_requests_repository import get_all_requests
from src.domain.user_pf_domain.entity_requests import entity_requests

def get_all_requests_use_case(cnpj):

    all_requests_data = get_all_requests(cnpj)
    
    if not all_requests_data:
        return {"message": "Não foi encontrado nenhuma requisicao"}, 404

    # SOLUÇÃO: Passar cada item da lista individualmente para a entidade
    requests_entity = [entity_requests(request) for request in all_requests_data]

    return {
        "entity": requests_entity
    }, 200
