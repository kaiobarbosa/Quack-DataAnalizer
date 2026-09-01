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