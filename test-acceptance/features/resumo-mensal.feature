Feature: Calcular Total de pedidos no Mês
    As a Usuário do Sistema
    I want to ser capaz de visualizar a quantidade, valor total e média de preço dos produtos de um período de minha escolha
    So that eu possa analisar o meu comportamento de compras no último mês

  Scenario: Cálculo bem sucedido de pedidos do último mês
    Given eu estou logado como "Usuário" com login "vrb" e senha "1234"
    And eu estou na página "Resumo mensal"
    And no período de "12/2022" até "12/2022" houveram "3" pedidos, de valor total igual a "R$175,00"
    When eu seleciono o período do cálculo de "12/2022" até "12/2022"
    Then eu posso ver o "quantidade total" dos pedidos igual a "3"
    And eu posso ver o "valor total" dos pedidos igual a "R$175,00"
    And eu posso ver o "média do valor" dos pedidos igual a "R$58,33"
    And eu posso ver a lista de pedidos do período

  Scenario: Tentativa de cálculo quando não há nenhum pedido no período
    Given eu estou logado como "Usuário" com login "vrb" e senha "1234"
    And eu estou na página "Resumo mensal"
    And no período de "01/2022" até "01/2022" houveram "0" pedidos, de valor total igual a "R$0,00"
    When eu seleciono o período do cálculo de "01/2022" até "01/2022"
    Then eu vejo uma mensagem do tipo "falha" por conta de "Não há pedidos no período!"

  Scenario: Cálculo de todos os pedidos já feitos
    Given eu estou logado como "Usuário" com login "vrb" e senha "1234"
    And eu estou na página "Resumo mensal"
    And no período de "05/2022" até "12/2022" houveram "5" pedidos, de valor total igual a "R$375,00"
    When eu filtro os pedidos sem adicionar um período
    Then eu posso ver o "quantidade total" dos pedidos igual a "5"
    And eu posso ver o "valor total" dos pedidos igual a "R$375,00"
    And eu posso ver o "média do valor" dos pedidos igual a "R$75,00"
    And eu posso ver a lista de pedidos do período

  Scenario: Filtrar apenas o valor total dos pedidos do período
    Given eu estou logado como "Usuário" com login "vrb" e senha "1234"
    And eu estou na página "Resumo mensal"
    And no período de "12/2022" até "12/2022" houveram "10" pedidos, de valor total igual a "R$500,00"
    When eu seleciono o período do cálculo de "12/2022" até "12/2022"
    And eu filtro apenas por "valor total" dos pedidos
    Then eu posso ver o "valor total" dos pedidos igual a "R$500,00"
    And eu não posso ver o "quantidade total" dos pedidos
    And eu não posso ver o "média do valor" dos pedidos
    And eu posso ver a lista de pedidos do período
