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
        data.get("name_user"), 
        data.get("lastname_user"), 
        data.get("function_user"),
        data.get("departmant_user"),
        data.get("email_user")
    )

    return enterprise

def entity_employee_update(data):

    employee = (
        data.get('name'),
        data.get('lastname'),
        data.get('role'),
        data.get('department'),
        data.get('email')
    )

    return employee