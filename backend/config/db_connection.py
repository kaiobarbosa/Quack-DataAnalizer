import mysql.connector
from mysql.connector import Error

def conectar_banco():
    try:
        # Estabelecendo a conexão
        conexao = mysql.connector.connect(
            host='localhost',          # Geralmente é localhost se estiver na sua máquina
            user='root',        # O padrão do MySQL costuma ser 'root'
            password='kaio2106',      # A senha que você definiu na instalação
            database='quack_db'   # O nome do seu Schema/Banco de dados
        )

        if conexao.is_connected():
            db_info = conexao.get_server_info()
            print(f"Conectado ao servidor MySQL versão: {db_info}")
            
            # Criando um objeto cursor para executar consultas
            cursor = conexao.cursor()
            cursor.execute("SELECT DATABASE();")
            linha = cursor.fetchone()
            print(f"Você está conectado ao banco: {linha[0]}")

    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        conexao = None

    return conexao

# Executar a função de teste
#minha_conexao = conectar_banco()

# Se a conexão foi bem sucedida, lembre-se de fechá-la ao final do script
#if minha_conexao and minha_conexao.is_connected():
    minha_conexao.close()
    print("Conexão com o MySQL foi encerrada.")