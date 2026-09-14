def entity_employee(data):

    employee = (
        data.get("id"), 
        data.get("name"), 
        data.get("lastname"), 
        data.get("function"), 
        data.get("department"),
        data.get("enterprise"),
        data.get("email"),
        data.get("password")
    )

    return employee

def entity_employee_home(data):

    enterprise = (
        data.get("name_enterprise"), 
        data.get("cnpj_enterprise"), 
        data.get("email_enterprise")
    )

    return enterprise