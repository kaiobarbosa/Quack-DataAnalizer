def entity_department(data):

    department = (
        data.get("id_department"),
        data.get("name_deparment"),
        data.get("cnpj_enterprise")
    )

    return department

