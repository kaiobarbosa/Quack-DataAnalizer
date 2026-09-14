from config.db_connection import conectar_banco

def create_employee_repository(data):

    employee_sql = "INSERT INTO user_pf (id_user, name_user, lastname_user, function_user, departmant_user,enterprise_user, email_user, password_user) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"

    connection = conectar_banco()
    cursor = connection.cursor()

    cursor.execute(employee_sql, data)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False
