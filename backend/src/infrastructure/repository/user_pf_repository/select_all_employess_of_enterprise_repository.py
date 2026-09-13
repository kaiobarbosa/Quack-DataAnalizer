from config.db_connection import conectar_banco

def select_all_employees_of_enterprise(cnpj):
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "select * from user_pf where state_user = 'Acept' and enterprise_user = %s;"
    cursor.execute(query, (cnpj,))
    enterprise_data = cursor.fetchall()

    cursor.close()
    connection.close()

    return enterprise_data
