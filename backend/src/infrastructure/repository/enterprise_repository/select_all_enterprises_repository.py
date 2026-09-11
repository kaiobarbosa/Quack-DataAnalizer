from config.db_connection import conectar_banco

def get_all_enterprise():
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "SELECT cnpj_enterprise, name_enterprise FROM enterprises"
    cursor.execute(query)
    enterprises = cursor.fetchall()

    cursor.close()
    connection.close()

    return enterprises
