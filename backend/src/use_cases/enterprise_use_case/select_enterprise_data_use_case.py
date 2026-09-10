from src.infrastructure.repository.enterprise_repository.select_enterprise_data_repository import get_data_enterprise
from src.domain.enterprise_domain.entity_enterprise import entity_enterprise_home
# Apaguei a importação do jsonify daqui!

def select_enterprise_data_use_case(cnpj):

    enterprise_all_data = get_data_enterprise(cnpj)
    
    # Boa prática: Verificar se a empresa realmente foi encontrada no banco
    if not enterprise_all_data:
        return {"message": "Empresa não encontrada"}, 404

    enterprise_entity = entity_enterprise_home(enterprise_all_data)

    # Retorne apenas um dicionário comum do Python
    return {
        "entity": enterprise_entity
    }, 200
