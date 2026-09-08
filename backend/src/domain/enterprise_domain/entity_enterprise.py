def entity_enterprise(data):

    enterprise = (
        data.get("id"), 
        data.get("name"), 
        data.get("cnpj"), 
        data.get("email"), 
        data.get("password"),
    )

    return enterprise