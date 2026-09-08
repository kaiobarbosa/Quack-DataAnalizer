from config.db_connection import conectar_banco

def check_id_generated_repository(id_generated):
    connection = conectar_banco()
    cursor = connection.cursor()

    check_id_sql = "SELECT id_enterprise FROM enterprises WHERE id_enterprise = %s;"
    cursor.execute(check_id_sql, (id_generated,))
    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if result is None:
        return True  # ID is unique
    else:
        return False  # ID already exists