from config.db_connection import conectar_banco

def verify_password_by_email_repository(email):

    enterprise_sql = "select password_user from user_pf where email_user = %s;"
    
    connection = conectar_banco()
    cursor = connection.cursor()

    cursor.execute(enterprise_sql, (email,))
    password_from_db = cursor.fetchone()
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return password_from_db[0]
    return False