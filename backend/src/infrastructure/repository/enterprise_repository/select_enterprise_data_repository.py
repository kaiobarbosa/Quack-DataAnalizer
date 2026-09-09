from config.db_connection import conectar_banco

def get_data_enterprise(cnpj):
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "SELECT * FROM enterprises WHERE cnpj_enterprise = %s"
    cursor.execute(query, (cnpj,))
    enterprise_data = cursor.fetchone()

    cursor.close()
    connection.close()

    return enterprise_data
