from src.infrastructure.repository.enterprise_repository.select_all_enterprises_repository import get_all_enterprise

def select_all_enterprises_use_case():

    all_enterprises = get_all_enterprise()
        
    if not all_enterprises:
        return {"message": "Empresas não encontradas"}, 404

    # Retorne apenas um dicionário comum do Python
    return {
        "entitys": all_enterprises
    }, 200
    