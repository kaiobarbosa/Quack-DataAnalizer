def entity_requests(data):

    all_request = {
        "id_user": data.get("id_user"),
        "name_user": data.get("name_user"),
        "lastname_user": data.get("lastname_user"),
        "function_user": data.get("function_user"),
        "departmant_user": data.get("departmant_user"),
        "enterprise_user": data.get("enterprise_user"),
        "email_user": data.get("email_user"),
        "state_user": data.get("state_user")
    }

    return all_request

