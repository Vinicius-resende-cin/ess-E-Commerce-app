Feature: Hístorico de Compras
    As a comprador
    I want to acessar o histórico de compras
    So that eu possa visualizar as minhas compras, repeti-las e me informar sobre os itens comprados

Scenario: Clicar em um item disponível no histórico
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Camisa verde" no histórico
And Vejo que esse produto ainda está em estoque no sistema
When Eu seleciono o produto "Camisa verde"
Then Eu vejo a página desse produto

Scenario: Clicar em comprar novamente em uma compra com todos os itens disponíveis
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com os itens "Camisa verde" e "Calça roxa"
And Vejo que ambos os itens dessa compra estão em estoque no sistema
When Eu seleciono "comprar novamente"
Then Eu vejo que os itens "Camisa verde" e "Calça roxa" estão no carrinho de compras

Scenario: Selecionar ver histórico de compras
Given Eu estou logada no sistema  como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Eu estou na página inicial do sistema
When Eu seleciono "Ver histórico de pedidos"
Then Eu vejo o histórico de compras com os pedidos de ids "1"
And Eu vejo os campos "valor, produtos, data de compra, status, quantidade, disponibilidade" com "150, Blusa Amarela, Saia Amarela, 20/12/2022 22:11:45, Entregue, 1, 1, 5, 6"

Scenario: Filtrando o histórico de compras para ver apenas as compras de abril de 2023
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Vejo que apenas o pedido de id "6" foi feito em "abril" de "2023"
When Eu seleciono "2023" no filtro
And Seleciono "abril" no filtro
Then Eu vejo todas as compras que foram feitas no mês de março do ano de 2022

Scenario: Clicar em comprar novamente em uma compra com algum item indisponível
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com id "7" com os itens "Camisa verde" e "Calça roxa"
And Vejo que o item "Camisa verde" ainda está em estoque no sistema
And Vejo que o item "Calça roxa" não está em estoque no sistema
When Eu seleciono "comprar novamente" na compra com id "7"
Then Eu vejo uma mensagem dizendo que o item "Calça roxa" está indisponível
And Vejo que o item "Camisa verde" está no carrinho de compras

Scenario: Selecionar um item indisponível no histórico de compras
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com o item "Calça roxa"
And Vejo que o item "Calça roxa" não está em estoque no sistema
When Eu seleciono o item "Calça roxa"
Then Eu vejo uma mensagem avisando que esse item não está disponível
And Eu seleciono "Ok"
And Eu continuo vendo o histórico de pedidos

Scenario: Clicar em comprar novamente em uma compra em que a quantidade de um mesmo item em estoque é menor do que a quantidade comprada anteriormente
Given Eu estou logada no sistema como cliente com o login "aqrs@cin.ufpe.br" e senha "posso@cess@r?"
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra de "3" unidades do item "Calça verde"
And Vejo que há apenas "2" unidade do item "Calça verde" em estoque
When Eu seleciono “comprar novamente”
Then Eu vejo uma mensagem informando que não há unidades suficientes do item "Calça verde" em estoque
And Eu seleciono "Ok"
And Eu vejo que "2" unidades do item "Calça verde" estão no carrinho de compras
