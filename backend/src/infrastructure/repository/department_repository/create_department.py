from config.db_connection import conectar_banco

def create_department_repository(data):

    print("sql data", data)

    enterprise_sql = "INSERT INTO departmant (id_departmant, name_departmant, enterprise_departmant) VALUES (%s, %s, %s);"

    connection = conectar_banco()
    cursor = connection.cursor()

    cursor.execute(enterprise_sql, data)
    connection.commit()

    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
        return True
    return False
