from config.db_connection import conectar_banco

def select_state_user(email):

    employee_sql = "select * from user_pf where email_user = %s;"
    
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) # Usamos dictionary para acessar os campos por nome!

    cursor.execute(employee_sql, (email,))
    employee_from_db = cursor.fetchone() # <--- ISSO AQUI EVITA O ERRO 'Unread result'
    
    # IMPORTANTE: Você NÃO precisa de connection.commit() em comandos SELECT. 
    # O commit só é usado em INSERT, UPDATE e DELETE.

    cursor.close()
    connection.close()

    # Retorna o dicionário com todos os dados do funcionário, ou None se não achar
    return employee_from_db
