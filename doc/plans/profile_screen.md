# User Profile Screen
   -  User profile screen sera a tela no qual o usuario (empresa e funcionario) ira gerenciar e atualizar suas informacoes pessoas (nome, email, etc...).
   - A tela em questao tera duas funcionalidades: Edicao dos dados e exibir o histórico de relatórios dos cvs feito pelo usuario.
   - A tela sera dividida em duas secoes: Header e body.
    - Header: Tera as informacoes do usuario (nome, sobrenome, funcao), ao lado um circulo responsavel pela foto de perfil (nao tem de fato o carregamento de um png, a foto se trata da primeira letra do nome do usuario)
        - A baixo das informacoes, deverá conter um botoes para a edicao das informacoes do usuario. (devera ser aberto uma sobretela de edicao na mesma tela)

    - Body: Contera o historico de relatórios. Devera ser feito como uma lista ou em grade exibindo em cada elemento um relatório com as informacoes principais (descrito abaixo, na structure) (atualmente nao tera integracao com o backend, entretanto crie um modulo, em js, que cria novos blocos com opcoes dos relatórios criados)
   - Para isso, seguiremos as "Warning Rules" da tela em questao e posteriormente as regras para a estrutucação da tela

## Warning Rules


  - Edicao de dados do usuario:   
    - ignorar o folder de backend. Deverá ser construido apenas o frontend (html e css (js apenas quando necessário))
    - Para a exibição dos dados atuais do usuario, deverá ser exibido através do placeholder dos inputs.
    - O botão de confirmar alterações só devera ser habilitado após, e seomente quando for feita alguma alteração no conteudo de qualquer input.
    - Ao clicar em salvar, deverá aparecer uma mensagem perguntando se o usuário teria certeza da alteracao solicitada, com duas opcoes de botao, confirmar e cancelar.

## User Profile screen structure

- body:
    - informaceos a serem exibidas ao abrir a tela em questao:
        - nome
        - sobrenome
        - funcao
        - botao que abre a sobretela de edicao das informacoes
        - foto de perfil -> um circulo com a primeira letra do nome.


        - tela de edicao:
            - A tela de edicao contará com os seguintes componentes:
                - Nome - input
                - Sobrenome - input
                - Função - input
                - Departamento - input
                - Email - input

                - botao para confirmar alteracoes - button

- Header:
    - Nessa secao, devera ser feito um esquema de grade, no qual os elementos dessa "grade", sendo um relatório feito pela conta em questao, no elemento deve conter as seguintes informacoes:
        - data de criacao
        - departamento
        
    - O elemento devera ser clicavel, no entranto, atualmemte pode fazer o click ficar sem redirecionamento, mas futuramente ele ira abrir o pdf com o relatório em questao.