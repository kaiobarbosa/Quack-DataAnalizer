# Home-Screen

## Resumo da tela
   - A tela de login deverá seguir o css planejado previamente e documentado em ../doc/plans/css_padronizacao.md
   - SideBar: a sidebar devera ser feita em um arquivo a parte. O arquivo é um arquivo.js e devera ser instanciado no scopo do html ( afim de garantir que todas as telas usem a mesma sidebar, sempre importando-a e usando ela sem alteracoes)

## hero-section


### sidebar
   - A sidebar funcionara como uma central para transitar entre as telas do sistema. 
   - A sidebar ficara do lado esquerdo
   - A sidebar devera conter os seguintes botoes, de cima para baixo, respectivamente:
      - Home -> tela atual
      - Carregar CSV
      - Análise
      - Relatórios

      - Perfil -> a opcao de perfil deve seguir os seguintes moldes:
        - o botao devera ter como seu label o nome do usuario (para isso, faca o id do button da seguinte maneira -> id="profile-button")
        - Por padrao, nao implemente a captura dos dados para saber o nome do usuario em questao, entretanto deixe de maneira estatica "user" como o nome

   - A organizacao dos botoes é feita da seguinte maneira: home, carregar csv, analise e relatorios alinhados um embaixo do outro a partir da parte superior da navbar. O button de perfil devera ficar separado e ficar ancorado na parte inferior da sidebar, apenas com uma margem de 10px do fim da sidebar.
      
### body

  - divida o body em tres sections, uper, middle e low.

  #### body-uper
    - devera conter 4 divs. 
        - arquivos processados -> quantidade de arquivos processados pela conta em questao
        - total de erros -> numero total de erros reportados nos logs dos csvs importados
        - total de avisos -> numero total de avisos reportados nos logs dos csvs importados
        - relatórios gerados -> quantidade de relatórios Gerados pela conta em questao
    - cada um devera ter uma cor de fonte/border/oq achar melhor: recomendo usar -> azul da pagina, vermelho, amarelo e roxo

  #### body-middle
    - divido em duas divs
        -  uma div que hospedara um grafico mostrando a atividade das ultimas 24h
            - devera conter a escrita: Atividade - Últimas 24h
            - devera conter a escrita do arquivo usado para obter tais dados
            - o grafico propriamente dito
        - Arquivos recentes:
            - Uma lista com os 3 ultimos arquivos upados no site.

  #### body-low
    - duas divs: 
        - grafico de pizza mostrando a severidade reportada
            - vermelho -> Crítico
            - amarelo -> Alto
            - azul -> Médio
            - cinza -> Baixo
        - uma div mostrando, atraves de um grafico de barras, os principais erros econtrados:
            - na parte superior o titulo: top erros por tipo
            - na parte esquerda: o nome do erro
            - seguindo o nome do erro, uma barra preenchida conforme a quantidade de vezes que o erro ocorre