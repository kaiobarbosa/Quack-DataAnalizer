# Create account and Login:

## Resumo:

   - A conexão do backend com frontend se derá por meio do Flask, utilizando dos conceitos de API RESTful para arquitetar todo esse projeto. 
   - Criptografia de senha: A criptografia será feita por meio do BCrypt, transformando a String digitada pelo usuário em 
   - A autenticação: A autenticação se derá por meio do JWT (Json Web Token) e será da seguinte maneira:    
    - 1. A Emissão do Crachá (Login)
        ⚬	O usuário digita e-mail e senha no Electron e envia via POST /api/login.
        ⚬	O seu UseCase em Python pega o e-mail, busca no PostgreSQL e pega o senha_hash.
        ⚬	Usando a biblioteca Bcrypt, o Python verifica se a senha bate.
        ⚬	Se estiver correta, o Python usa uma biblioteca (como PyJWT) para assinar digitalmente um token contendo o ID do usuário e a validade (ex: expira em 8 horas).
        ⚬	O Python devolve esse token (uma string longa de letras e números) para o Electron.
      2. Guardando o Crachá (Frontend)
        ⚬	O Electron recebe o token e o salva na memória local (no localStorage ou sessionStorage do navegador embutido).
      3. Apresentando o Crachá (Analisar Arquivo)
        ⚬  	Quando o usuário clica em "Processar CSV", o Electron faz o POST /api/logs/analisar.
        ⚬	Junto com essa requisiÃ§Ã£o, o Electron envia o token escondido no cabeÃ§alho HTTP (chamado de Authorization: Bearer ).
        ⚬	O Python recebe o arquivo, mas antes de processar, ele lê o cabeçalho. Ele verifica a assinatura digital do token. Se for autêntico e não estiver expirado, ele libera o processamento pesado; se for inválido, ele devolve um erro 401 Unauthorize
   - Os locais de criação de códigos são os seguintes:
      - HTML: frontend/public/index.html
      - CSS: frontend/src/assets/style/index_style/index.css
      - JS: frontend/src/services/index_services/index.js
   - Para fins de padronização, todos os arquivos devem conter, primeiramente, o arquivo normalize.css. Nele, o css base vai ser resetado, evitando margem padrão, font do tamanho errado, etc.
      - frontend/src/assets/style/normalize.css

## Create Account Screen
  - A tela de login e de criar a conta devera ser a mesma, entretanto, apenas uma funcionalidade devera ser mostrada por vez. O que vai definir a mudanca da tela devera ser um botao (botao caso o usuario ainda nao tenha uma conta.)
### Login 
  - O login devera conter duas versoes, uma de pessoa juridica e uma de pessoa fisica. Para saber se a conta é de pessoa física ou pessoa jurídica. Pode ser feito por meio de um button switch onde dependendo da opcao selecionada, diferentes inputs apareceram para tela.
    - Inputs pessoa fisica:
      - email ou cpf -> input
      - senha -> input
      - esqueceu a senha? -> inove...
      - não tem uma conta? Cadastre-se. -> inove...
      - entrar -> button
      (Ao digitar uma senha, o usuario devera ter a opcao de exibi-la ou nao. O código para isso devera ser escrito no seguinte arquivo frontend/src/utils/show_passwod.js)
    - Inputs pessoa jurídica:
      - email ou cnpj -> input
      - senha -> input
      - esqueceu a senha? -> inove...
      - não tem uma conta? Cadastre-se. -> inove...
      - entrar -> button
      (Ao digitar uma senha, o usuario devera ter a opcao de exibi-la ou nao. O código para isso devera ser escrito no seguinte arquivo frontend/src/utils/show_passwod.js)


### Create Account
  - Tela de criar uma conta em si, nela deverá seguir os mesmos padrões de css definidos previamente. Para a confecção da tela, devemos pensar nos dados dos quais precisamos para realizar o include no banco de dados.
    - Saber se a conta é de pessoa física ou pessoa jurídica. Pode ser feito por meio de um button switch onde dependendo da opcao selecionada, diferentes inputs apareceram para tela
    - É necessário lembrar também que, todos os campos que serão ditos abaixo, deverão conter um input para o usuário digita-los.
    - Campos necessários: 
      - Pessoa Física:
        - Nome -> input
        - Sobrenome -> input
        - Função -> dropbox
        - Departamento -> dropbox
        - Empresa -> dropbox
        - Email -> input
        - Senha -> input
        - Confirmar senha -> input
        - Cadastrar -> input
        (Ao digitar uma senha, o usuario devera ter a opcao de exibi-la ou nao. O código para isso devera ser escrito no seguinte arquivo frontend/src/utils/show_passwod.js)
      - Pessoa jurídica:
        - Nome - input
        - Cnpj - input
        - Email - input
        - Senha - input
        - Confirmar senha -> input
        - Cadastrar -> input
        (Ao digitar uma senha, o usuario devera ter a opcao de exibi-la ou nao. O código para isso devera ser escrito no seguinte arquivo frontend/src/utils/show_passwod.js)

### Credenciais pj para teste

nome: Embraer
cnpj: 07.689.002/0001-89
email: embraer@gmail.com
senha: 123123

### Create account user PF
  - diferente do usuario pj (empresa) o usuário pf precisa de uma autorizacao para que seja possivel cadatra-lo.
    - Empresa que faz essa autorizacao.
    - para um usuario pf se cadastrar, alem da empresa precisar autorizar a criação da conta, a empresa tera que ter criado previamente setores para que o usuario faça parte (necessario informar o setor quando tiver criando a conta).

  - Primeiros passo para criar a conta do usuario pf: Criar a tela de cadastro de departamento
  - Segundo passo para criar a conta do usuario pf: criar a tela para aprovar e gerenciar os usuario pf (funcionarios)

#### Create new departmant screen

##### Warning/Rules
  - ignorar o folder de backend. Deverá ser construido apenas o frontend (html e css (js apenas quando necessário))
  - Ao iniciar o cadastro de um novo departamento, o botao de inclusao devera ser habilitado apenas se tiver algo digitado no input. Enquanto for nulo, deverá ficar desabilitado

  - Campos necessários: 
    - Name_departmant -> input
    - Enterprise_departmant -> via backend
    - ID_departmant -> via backend
  - Embora haja 3 campos a serem preenchidos no cadastro de um novo departamento, apenas uma tera na tela, as demais serao importadas do backend posteriormente ao preenchimento do input do usuario.
  - A tela de departamentos/ criar novos departamentos, sera um blend de funcionalidades. Alem do cadastro, a pagina em si servirá para administrar os departamentos existentes. Para isso a tela sera dividida em duas partes. Header e body.
    - Header: devera ter um width que cobre a tela toda (nao ignorar a sidebar), já o height pequeno.
      - conterá um botao para criar um novo departamento. 
      - o botão deverá ficar no lado direito.
      - Ao clicar o botao, e header deverá ter seu height aumentado e que fique visivel, no próprio header, um input para incluir o nome do departamento. 
    - Body: Servirá para listar os departamentos existentes, contendo uma opcao em cada elemento dessa lista (cada departamento) uma opcao para editar ou inativar o departamento específico.
      - Ao listar os departamentos, caso a quantidade de elementos listados seja grande e nao caiba na tela, nao devera ser criado uma scrollbar geral na pagina, devera ser criado uma scrollbar apenas na area dos departamentos listados. Para isso os elementos deverão estar em uma div que engloba todos os elementos da lista.
      - Essa listada ja deve ser criada pensando que a quantidade de elementos na lista, vai ser variada, e devera ser projetada para que seja incluid0, a partir do retorno dos dados via backend, todos os departamentos existentes no banco de dados.
      - de maneira inicial, nao havera departamentos criados... Nesse caso, quando não houver departamentos criados, na div de listagem devera ser exibida a seguinte mensagem "Ainda não há departamentos criados.". Essa mensagem pode ser criada de maneira estática, via html mesmo.