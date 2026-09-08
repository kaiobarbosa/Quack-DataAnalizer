from config.db_connection import conectar_banco

def verify_password_repository(cnpj):

    enterprise_sql = "select password_enterprise from enterprises where cnpj_enterprise = %s;"
    
    connection = conectar_banco()
    cursor = connection.cursor()

    cursor.execute(enterprise_sql, (cnpj,))
    password_from_db = cursor.fetchone()
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return password_from_db[0]
    return False