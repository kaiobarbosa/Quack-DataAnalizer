# DATA ANALYZER

## Resumo:
   - Ferramenta de Análise de Dados e Logs Massivos

   - Mini Mundo: Empresas perdem muito tempo e mão de obra analizando logs de suas aplicações/produtos. A partir disso, surgiu a ideia do Data Analyzer, uma aplicação desktop que faz todo o trabalho pesado e retorna relatórios personalizados. 

   - Divisão do código
        - Frontend: HTML5, CSS3, JavaScript - para funcionar em um ambiente desktop, será utilizado o framework Electron
        - Backend: Python - para conectar frontend com backend será utilizado Flask.
        - Database: PostgreSQL

   - Uma interface elegante no Electron onde o usuário arrasta um arquivo de log ou CSV gigante. A aplicação filtra, busca padrões e exibe gráficos de pizza e barras dos erros mais comuns. O backend vai ler o arquivo de forma otimizada (usando buffers de memória), aplicar algoritmos de busca estruturada para filtrar os dados e devolver um resumo em formato JSON para o frontend.

   - A arquitetura para os arquivos sera feita no formato clean code. 

   - Estrutura de dados: 
        - backend/
            - app.py *config do flask
            - config/ *onde vai conectar com o banco, iniciar o electron
            - src/
                - domain/           *Contém apenas as classes puras do sistema. Eles guardam as entidades e suas validações 
                - use_cases/        *Onde as regras de negócio operam. Ele, por exemplo, verifica a auth do user e o token.
                - infrastructure/   *Esta é a única camada que tem permissão técnica para conversar com o hd ou bd
                    - repository/           *Onde vai exeutrar os comandos sql
                    - external_services/    *Onde ocorrera a criptografia, gerador jwt e o leitor em lotes otimizados (abrir csv)
                - presentation/     *Aqui que fica as rotas e onde vai retornar os protocolos http
                - use_cases/
