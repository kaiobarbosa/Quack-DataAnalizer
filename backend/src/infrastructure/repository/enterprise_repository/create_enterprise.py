from config.db_connection import conectar_banco

def create_enterprise_repository(data):

    enterprise_sql = "INSERT INTO enterprises (id_enterprise, name_enterprise, cnpj_enterprise, email_enterprise, password_enterprise) VALUES (%s, %s, %s, %s, %s);"

    connection = conectar_banco()
    cursor = connection.cursor()

    cursor.execute(enterprise_sql, data)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False
