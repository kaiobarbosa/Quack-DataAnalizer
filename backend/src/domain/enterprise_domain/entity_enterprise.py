def entity_enterprise(data):

    enterprise = (
        data.get("id"), 
        data.get("name"), 
        data.get("cnpj"), 
        data.get("email"), 
        data.get("password"),
    )

    return enterprise

def entity_enterprise_home(data):

    enterprise = (
        data.get("name_enterprise"), 
        data.get("cnpj_enterprise"), 
        data.get("email_enterprise"), 
    )

    return enterprise