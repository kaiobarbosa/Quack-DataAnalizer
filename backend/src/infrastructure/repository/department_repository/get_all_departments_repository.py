from config.db_connection import conectar_banco

def get_all_departments(cnpj):

    enterprise_sql = "select name_departmant from departmant where enterprise_departmant = %s;"

    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 


    cursor.execute(enterprise_sql, (cnpj,))
    all_departments_data = cursor.fetchall()
    connection.commit()

    cursor.close()
    connection.close()

    return all_departments_data
