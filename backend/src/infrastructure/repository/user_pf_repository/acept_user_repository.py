from config.db_connection import conectar_banco

def acept_user(id_user,  cnpj):
    connection = conectar_banco()
    cursor = connection.cursor(dictionary=True) 

    query = "update user_pf set state_user = 'Acept' where id_user = %s and enterprise_user = %s;"
    cursor.execute(query, (id_user, cnpj))
    connection.commit()
    
    cursor.close()
    connection.close()

    if cursor.rowcount > 0:
       return True
    return False
   
