from src.infrastructure.repository.user_pf_repository.acept_user_repository import acept_user
from src.domain.user_pf_domain.entity_requests import entity_requests

def acept_user_use_case(cnpj, id_user):

    acept_user_pf = acept_user(cnpj, id_user)
    
    if acept_user_pf == False:
        return {"message": "Não foi possivel aceitar o usuário"}, 404

    return {
        "Acept User = ": acept_user_pf
    }, 200
