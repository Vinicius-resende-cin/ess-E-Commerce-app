Feature: Calcular Total de pedidos no Mês
    As a Usuário do Sistema
    I want to ser capaz de visualizar a quantidade, valor total e média de preço dos produtos de um período de minha escolha
    So that eu possa analisar o meu comportamento de compras no último mês

  Scenario: Cálculo bem sucedido de pedidos do último mês
    Given o email "vrb@cin.ufpe.br" já foi cadastrado com a senha "12345678" 
    And eu já estou logado no sistema como "vrb@cin.ufpe.br" com a senha "12345678"
    And eu estou na página "Resumo mensal"
    And no período de "12/2022" até "12/2022" houveram "3" pedidos, de valor total igual a "R$275,00"
    When eu seleciono o período do cálculo de "12/2022" até "12/2022"
    Then eu posso ver o "quantidade total" dos pedidos igual a "3"
    And eu posso ver o "valor total" dos pedidos igual a "R$275,00"
    And eu posso ver o "média do valor" dos pedidos igual a "R$91,67"
    And eu posso ver a lista de pedidos do período

  Scenario: Tentativa de cálculo quando não há nenhum pedido no período
    Given o email "vrb@cin.ufpe.br" já foi cadastrado com a senha "12345678" 
    And eu já estou logado no sistema como "vrb@cin.ufpe.br" com a senha "12345678"
    And eu estou na página "Resumo mensal"
    And no período de "01/2022" até "01/2022" houveram "0" pedidos, de valor total igual a "R$0,00"
    When eu seleciono o período do cálculo de "01/2022" até "01/2022"
    Then eu vejo uma mensagem do tipo "falha" por conta de "Não há pedidos no período!"

  Scenario: Cálculo de todos os pedidos já feitos
    Given o email "vrb@cin.ufpe.br" já foi cadastrado com a senha "12345678" 
    And eu já estou logado no sistema como "vrb@cin.ufpe.br" com a senha "12345678"
    And eu estou na página "Resumo mensal"
    And no período de "12/2022" até "12/2023" houveram "5" pedidos, de valor total igual a "R$475,00"
    When eu filtro os pedidos sem adicionar um período
    Then eu posso ver o "quantidade total" dos pedidos igual a "5"
    And eu posso ver o "valor total" dos pedidos igual a "R$475,00"
    And eu posso ver o "média do valor" dos pedidos igual a "R$95,00"
    And eu posso ver a lista de pedidos do período

  Scenario: Filtrar apenas o valor total dos pedidos do período
    Given o email "vrb@cin.ufpe.br" já foi cadastrado com a senha "12345678" 
    And eu já estou logado no sistema como "vrb@cin.ufpe.br" com a senha "12345678"
    And eu estou na página "Resumo mensal"
    And no período de "12/2022" até "12/2022" houveram "3" pedidos, de valor total igual a "R$275,00"
    When eu seleciono o período do cálculo de "12/2022" até "12/2022"
    And eu seleciono por "valor total" dos pedidos
    Then eu posso ver o "valor total" dos pedidos igual a "R$275,00"
    And eu não posso ver o "quantidade total" dos pedidos
    And eu não posso ver o "média do valor" dos pedidos
    And eu posso ver a lista de pedidos do período
