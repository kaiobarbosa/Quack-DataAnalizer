from config.db_connection import conectar_banco

def get_employee_data(email):
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "SELECT * FROM user_pf WHERE email_user = %s"
    cursor.execute(query, (email,))
    employee_data = cursor.fetchone()

    cursor.close()
    connection.close()

    return employee_data
