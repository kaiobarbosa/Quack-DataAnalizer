from config.db_connection import conectar_banco

def update_employee_repository(data, email):

    employee_sql = "UPDATE user_pf SET name_user = %s, lastname_user = %s, function_user = %s, departmant_user = %s, email_user = %s WHERE email_user = %s;"

    connection = conectar_banco()
    cursor = connection.cursor()

    values = data + (email,)

    cursor.execute(employee_sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False
