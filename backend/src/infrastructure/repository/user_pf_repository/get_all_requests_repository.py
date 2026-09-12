from config.db_connection import conectar_banco

def get_all_requests(cnpj):
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "select * from user_pf where state_user = 'Pending' and enterprise_user = %s;"
    cursor.execute(query, (cnpj,))
    enterprise_data = cursor.fetchall()

    cursor.close()
    connection.close()

    return enterprise_data
