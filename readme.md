# Data Analyzer
   - Mini-mundo:

## Bibliotecas:

   - psycopg2-binary -> driver do PostgreSQL para o python
   - Flask-SQLAlchemy -> Ela simplifica a conexão, mapeia as tabelas do banco em classes Python (ORM) e gerencia o ciclo de vida das conexões automaticamente.


## Organização das pastas e arquivos

    backend/ -> todos os codigos remetentes ao backend e banco de dados
    frontend/ -> remete ao html, css e js (inicializaçao do electron fica na pasta config/ no backend.)

### Subpastas 

    backend/config/ -> Responsável por armazenar as configurações base da aplicação, como conector com banco de dados, incializador
                       do electron...
    backend/src/ -> repositório onde ficara todo a parte operacional, própriamente dita, do backend.    
    backend/src/domain -> contém as classes do sistema, servindo para guardar as entidades
    backend/src/infrastructure -> camada do backend responsável por poder fazer alterações no disco ou no banco de dados.
    backend/src/infrastructure/repository -> onde vai executar os comandos sql.
    backend/src/infrastructure/external_services -> responsável por gerar o JWT, fazer os processos de leitura em lotes otimizados
    backend/src/presentation -> onde vai ficar as rotas.

## Arquivos chaves  

    backend/config/db_connection.py -> faz a conexão com o banco de dados.
    backend/condig/main.js -> inicia o electron