# Data Analyzer

## Sobre o Projeto
A aplicação Data Analyzer é uma ferramenta de análise de dados e logs massivos. O projeto surgiu do mini-mundo onde empresas perdem muito tempo e mão de obra analisando logs de suas aplicações e produtos. Trata-se de uma aplicação desktop que realiza o trabalho pesado de processamento de arquivos e retorna relatórios personalizados para o usuário. Através de uma interface elegante no Electron, o usuário pode arrastar um arquivo gigante de log ou CSV. A aplicação então filtra as informações, busca padrões estruturados e exibe gráficos de pizza e barras contendo os erros mais comuns do arquivo.

## Tecnologias Utilizadas
   **Frontend**: A interface utiliza HTML5, CSS3 e JavaScript. 
   **Framework Desktop**: Para que o sistema funcione como uma aplicação desktop otimizada, é utilizado o framework Electron.
   **Backend**: O servidor é desenvolvido em Python, utilizando o framework Flask para conectar o frontend ao backend através de uma arquitetura de API RESTful.
   **Banco de Dados**: O armazenamento dos dados corporativos e credenciais é feito em MySQL.
   **Bibliotecas em Destaque**:
       O projeto utiliza a biblioteca `mysql.connector` para conectar o banco de dados com o código em Python.
       A biblioteca `Flask-SQLAlchemy` simplifica a conexão, mapeia as tabelas via modelo ORM (Object-Relational Mapping) e gerencia o ciclo de vida das conexões automaticamente.
       A criptografia e a segurança das senhas são realizadas utilizando o `BCrypt`.
       A autenticação de usuários é feita via JWT (Json Web Token), utilizando a biblioteca `PyJWT` para assinar digitalmente os acessos e validações.

## Arquitetura e Organização de Diretórios
O projeto foi totalmente projetado seguindo as diretrizes do Clean Code para sua organização de pastas e arquivos. O padrão de nomenclatura estabelece que arquivos sejam nomeados no formato "função + entidade" (ex: `entity_enterprise.py`), enquanto as pastas seguem o formato "entidade + função" (ex: `enterprise/domain`).

### Estrutura do Frontend
*   **`frontend/`**: Diretório que engloba toda a interface e os códigos estáticos de HTML, CSS e JS.
*   A estruturação das páginas inclui arquivos localizados em `frontend/public/index.html`, `frontend/src/assets/style/index_style/index.css` e `frontend/src/services/index_services/index.js`.
*   Todos os arquivos de layout utilizam primeiramente o arquivo de padronização `normalize.css` (`frontend/src/assets/style/normalize.css`), responsável por resetar a estilização base e evitar margens padronizadas e fontes de tamanhos incorretos do navegador embutido.

### Estrutura do Backend
*   **`backend/`**: Diretório principal da infraestrutura, roteamento, servidor e comunicação com o banco de dados.
*   **`app.py`**: Arquivo responsável pela configuração base do Flask.
*   **`config/`**: Armazena as configurações fundamentais da aplicação, incluindo as credenciais de conexão com o banco (`db_connection.py`) e o arquivo inicializador do Electron (`main.js`).
*   **`src/domain/`**: Contém estritamente as classes puras do sistema, guardando as entidades principais e suas validações.
*   **`src/use_cases/`**: Camada onde operam todas as regras de negócio, executando, por exemplo, a verificação de autenticação do usuário e do token de sessão.
*   **`src/infrastructure/`**: É a única camada com permissão técnica para conversar com o disco rígido (HD) ou o banco de dados. Inclui a subpasta `repository/` para execução das rotinas e comandos SQL. Inclui também a pasta `external_services/` dedicada à geração do JWT, processos de criptografia e procedimentos de leitura de arquivos pesados em lotes otimizadosdelete .
*   **`src/presentation/`**: Guarda os diretórios de rotas (como `enterprise/` e `user_pf/`), onde a aplicação formata os dados e retorna os devidos protocolos HTTP.

## Funcionalidades e Fluxos

### 1. Processamento de Dados Massivos
*   O backend da aplicação efetua a leitura otimizada dos grandes arquivos utilizando técnicas como os buffers de memória.
*   Com os arquivos lidos, a ferramenta aplica algoritmos de busca estruturada para filtrar os dados.
*   O resultado mastigado e sumarizado dessa análise é então devolvido em formato JSON para o processamento gráfico do frontend.
*   O processo pesado de leitura só ocorre se o usuário apresentar, via cabeçalho HTTP, um token válido e não-expirado.

### 2. Autenticação e Segurança (Login)
*   O acesso ao sistema possui duas modalidades: Pessoa Física e Pessoa Jurídica, controladas de forma fluída por um componente de botão "switch" na interface.
*   Os inputs exigidos em tela variam de acordo com a aba selecionada (exigindo E-mail/CPF para conta PF, ou E-mail/CNPJ para conta PJ).
*   No momento em que o usuário preenche suas informações no Electron e as envia (`POST /api/login`), o Python efetua uma consulta pelo e-mail e verifica a autenticidade comparando a hash registrada com o BCrypt.
*   Caso validado com sucesso, o servidor assina e emite um token digital (JWT) contendo as informações não sensíveis, como o ID e a validade.
*   O Electron armazena este token (via `localStorage` ou `sessionStorage`) e anexa essas informações ao cabeçalho HTTP de futuras requisições restritas usando a chave `Authorization: Bearer`.

### 3. Criação de Conta
*   A interface de criação de conta atua no mesmo módulo que o login, trocando sua visão de acordo com as ações do usuário.
*   Tanto no ato de cadastro quanto no de login, os inputs de senha possuem a função utilitária de exibir ou ocultar os dígitos digitados, cuja lógica JavaScript habita o arquivo `frontend/src/utils/show_passwod.js`.
*   **Conta PJ (Empresas)**: Requer dados chave, como o Nome da empresa, o CNPJ, E-mail, Senha e Confirmação de Senha. O fluxo de formulário realiza uma validação de senha rígida, onde o sistema cruza os dígitos informados e exige que ambos sejam exatamente iguais, bloqueando o envio e exibindo um erro no caso de divergências (`password_enterprise == confirmed_password_enterprise`).
*   **Conta PF (Funcionários)**: A criação de uma conta para o tipo de funcionário exige que a empresa responsável autorize a ativação da conta no sistema. O usuário também precisa preencher um departamento já criado previamente na base de dados da empresa. Os campos requeridos no cadastro englobam: Nome, Sobrenome, Função (seleção dropbox), Departamento (seleção dropbox), Empresa (seleção dropbox), E-mail, Senha e Confirmar senha.

### 4. Gestão de Departamentos
*   A tela dedicada aos departamentos é construída pela divisão de duas interfaces interativas principais: um "Header" e um "Body" listado.
*   O Header do layout possui dimensões compactas inicialmente e comporta o botão responsável pela inclusão de um novo departamento, alocado ao lado direito. 
*   Ao acionar o botão de criação, o Header se expande, visibilizando o campo de input destinado à nomeclatura. 
*   Para manter a fluidez de interface, o botão final de inclusão no banco de dados só é habilitado se houver dados consistentes digitados no respectivo input.
*   O Body da tela exibe os departamentos atuais em forma de lista originada do backend e garante, para cada item de setor, botões responsáveis pelas edições das informações ou inativação do mesmo.
*   A lista foi elaborada pensando em grandes escalas, possuindo uma barra de rolagem (scrollbar) independente do restante da página; caso uma nova empresa não possua dados cadastrados, ela exibe o alerta "Ainda não há departamentos criados.".

### 5. Gestão de Funcionários (Portal de Empregados)
*   A interface de gerenciamento de equipe é uma aba dedicada às organizações empresariais (usuários PJ).
*   Ela possui duas partes que são sobrepostas visualmente: a parte de gestão de usuários já aprovados, e a área das novas requisições.
*   **Usuários Ativos**: Exibe de forma limpa, no formato de cards ("elementos"), os funcionários correntes com visibilidade prioritária para seus Nomes, Funções e Departamentos atrelados. As demais variáveis de base (Sobrenome e Email) e as ferramentas de inativação são reveladas aos usuários a partir de uma interação nos botões de edição de informações individuais.
*   **Aprovação de Contas (Solicitações)**: Lista todos os pedidos pendentes de criação de contas feitas pelas Pessoas Físicas (PF) com destinação de atuação à referida organização. Mostra o perfil prévio (Nome, Função e Departamento), junto aos atalhos determinantes para que a empresa possa aprovar a solicitação e conceder acesso ou rejeitá-la. No caso de recusa da conta, um pop-up de segurança é acionado requerendo a verificação se o administrador tem certeza de tal exclusão; sendo a exclusão visual aplicada imediatamente ao finalizar essa interação.
