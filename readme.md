# Data Analyzer
   - Mini-mundo: Empresas perdem muito tempo e mão de obra analizando logs de suas aplicações/produtos. A partir disso, surgiu a ideia do Data Analyzer, uma aplicação desktop que faz todo o trabalho pesado e retorna relatórios personalizados.

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

## Criação de Usuário — Pessoa Jurídica (PJ)

A criação de um usuário do tipo **Pessoa Jurídica (PJ)** ocorre por meio da tela de criação de conta. A aplicação utiliza a mesma interface para os cadastros de Pessoa Física e Pessoa Jurídica, sendo a modalidade escolhida por meio de um `button switch`. A partir da opção selecionada, somente os campos correspondentes ao tipo de usuário são apresentados.

### Dados necessários

Para realizar o cadastro de uma empresa, devem ser informados os seguintes dados:

| Campo                           | Descrição                     |
| ------------------------------- | ----------------------------- |
| `name_enterprise`               | Nome da empresa               |
| `cpnj_enterprise`               | CNPJ da empresa               |
| `email_enterprise`              | E-mail utilizado pela empresa |
| `password_enterprise`           | Senha de acesso               |
| `confirmed_password_enterprise` | Confirmação da senha          |

Esses campos correspondem aos dados definidos para o cadastro de uma Pessoa Jurídica no projeto.

### Validação das senhas

Durante o cadastro, o campo `confirmed_password_enterprise` deve possuir exatamente o mesmo valor informado em `password_enterprise`.

O cadastro somente deve prosseguir quando:

```text
password_enterprise == confirmed_password_enterprise
```

Caso os valores sejam diferentes, o usuário deverá ser informado sobre a inconsistência e o cadastro não deverá ser concluído.

### Fluxo do cadastro

O fluxo de criação de um usuário PJ pode ser representado da seguinte maneira:

```text
Usuário acessa "Criar conta"
        ↓
Seleciona "Pessoa Jurídica"
        ↓
Preenche os dados da empresa
        ↓
Informa a senha
        ↓
Confirma a senha
        ↓
Sistema verifica se as senhas são iguais
        ↓
    ┌─── Não ───→ Exibe erro
    │
    └─── Sim ───→ Prossegue com o cadastro
```

### Campos do formulário

O formulário de Pessoa Jurídica deve apresentar:

* Nome da empresa
* CNPJ
* E-mail
* Senha
* Confirmar senha
* Botão de cadastro

Além disso, os campos de senha devem possuir a opção de exibir ou ocultar o conteúdo digitado. A implementação dessa funcionalidade está prevista no arquivo:

```text
frontend/src/utils/show_passwod.js
```

### Integração com a aplicação

A comunicação entre o frontend e o backend da aplicação é realizada utilizando **Flask**, seguindo uma arquitetura baseada em **API RESTful**. A autenticação e o armazenamento das credenciais seguem a estrutura definida no projeto, incluindo o uso de BCrypt para tratamento das senhas.

A partir do cadastro, os dados preenchidos no formulário deverão ser encaminhados ao backend para que o usuário PJ seja criado de acordo com as regras da aplicação.
