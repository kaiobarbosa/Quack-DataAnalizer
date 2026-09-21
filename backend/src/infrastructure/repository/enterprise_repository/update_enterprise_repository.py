from config.db_connection import conectar_banco

def update_enterprise_repository(data, cnpj):

    employee_sql = "UPDATE enterprises set name_enterprise = %s, cnpj_enterprise = %s, email_enterprise = %s where cnpj_enterprise = %s;"

    connection = conectar_banco()
    cursor = connection.cursor()

    values = data + (cnpj,)

    cursor.execute(employee_sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False
