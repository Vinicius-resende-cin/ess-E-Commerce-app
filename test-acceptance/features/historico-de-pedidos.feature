Feature: Hístorico de Compras
    As a comprador
    I want to acessar o histórico de compras
    So that eu possa visualizar as minhas compras, repeti-las e me informar sobre os itens comprados

Scenario: Clicar em um item disponível no histórico
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Camisa verde" do pedido "7" no histórico
And Vejo que o produto "Camisa verde" do pedido "7" ainda tem "12" em estoque no sistema
When Eu seleciono o produto "Camisa verde" do pedido "7"
Then Eu vejo a página do produto "Camisa verde"

Scenario: Selecionar um item indisponível no histórico de compras
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Top Amarela" do pedido "5" no histórico
And Vejo que o produto "Top Amarela" do pedido "5" não está em estoque no sistema
When Eu seleciono o produto "Top Amarela" do pedido "5"
Then Eu vejo uma mensagem dizendo que "Esse produto está indisponível"

Scenario: Clicar em comprar novamente em uma compra com todos os itens disponíveis
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Camisa verde" do pedido "7" no histórico
And Vejo que o produto "Camisa verde" do pedido "7" ainda tem "12" em estoque no sistema
When Eu seleciono "comprar novamente" no pedido "7"
Then Eu vejo que o produto "Camisa verde" esta no carrinho de compras

Scenario: Clicar em comprar novamente em uma compra em que a quantidade de um mesmo item em estoque é menor do que a quantidade comprada anteriormente
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Saia Laranja" do pedido "1" no histórico
And Estou vendo o item "Camisa azul" do pedido "1" no histórico
And Vejo que o produto "Saia Laranja" do pedido "1" ainda tem "62" em estoque no sistema
And Vejo que o produto "Camisa azul" do pedido "1" ainda tem "12" em estoque no sistema
And foram compradas "13" "Camisa azul" no pedido "1"
When Eu seleciono "comprar novamente" no pedido "1"
Then Eu vejo uma mensagem dizendo que "Não há unidades suficientes dos itens Camisa azul"
And Eu vejo que "12" unidades do item "Camisa azul" estão no carrinho de compras

Scenario: Clicar em comprar novamente em uma compra com algum item indisponível
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o item "Saia Laranja" do pedido "2" no histórico
And Estou vendo o item "Top Amarela" do pedido "2" no histórico
And Vejo que o produto "Saia Laranja" do pedido "1" ainda tem "62" em estoque no sistema
And Vejo que o produto "Top Amarela" do pedido "5" não está em estoque no sistema
When Eu seleciono "comprar novamente" no pedido "2"
Then Eu vejo uma mensagem dizendo que "Os itens Top Amarela estão indisponíveis"
And Eu vejo que o produto "Saia Laranja" esta no carrinho de compras
And Eu vejo que o produto "Top Amarelo" não esta no carrinho de compras

Scenario: Filtrando o histórico de compras para ver apenas as compras de abril de 2023
Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
And Estou vendo o histórico de pedidos da minha conta
And Vejo que em "04/2023" houveram "2" pedidos
When Eu seleciono "04/2023" nos campos do filtro do histórico
Then Eu vejo que há apenas "2" pedidos no histórico
And Vejo que os pedidos foram feitos em "04/2023"
