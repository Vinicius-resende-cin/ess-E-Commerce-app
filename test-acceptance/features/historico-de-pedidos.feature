Feature: Hístorico de Compras
    As a comprador
    I want to acessar o histórico de compras
    So that eu possa visualizar as minhas compras, repeti-las e me informar sobre os itens comprados

Scenario: Clicar em um item disponível no histórico
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Estou vendo o produto “Camisa verde” no histórico
And Vejo que esse produto ainda está em estoque no sistema
When Eu seleciono o produto “Camisa verde”
Then Eu vejo a página desse produto

Scenario: Clicar em comprar novamente em uma compra com todos os itens disponíveis
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com os itens “Camisa verde” e “Calça roxa”
And Vejo que ambos os itens dessa compra estão em estoque no sistema
When Eu seleciono “comprar novamente”
Then Eu vejo uma mensagem confirmando que todos os itens estão no carrinho
And Eu vejo que os itens “Camisa verde” e “Calça roxa” estão no carrinho de compras

Scenario: Selecionar ver histórico de compras
Given Eu estou logada no sistema  como cliente com o login “aqrs” e senha “1234”
And Eu estou na página inicial do sistema
When Eu seleciono “Ver histórico de pedidos”
Then Eu vejo o histórico de compras com todas as compras associadas a minha conta
And Eu vejo o valor desses pedidos
And Eu vejo a data em que foram comprados
And Eu vejo o status deles
And Eu vejo a opção de comprar novamente
And Eu vejo se esses itens estão disponíveis no sistema

Scenario: Filtrando o histórico de compras para ver apenas as compras de março de 2022
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Vejo o filtro do histórico de compras
When Eu seleciono “2022” no filtro
And Seleciono “março” no filtro
Then Eu vejo todas as compras que foram feitas no mês de março do ano de 2022

Scenario: Clicar em comprar novamente em uma compra com algum item indisponível
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com os itens “Camisa verde” e “Calça roxa”
And Vejo que o item “Camisa verde” ainda está em estoque no sistema
And Vejo que o item “Calça roxa” não está em estoque no sistema
When Eu seleciono “comprar novamente”
Then Eu vejo uma mensagem dizendo que o item “Calça roxa” está indisponível
And Vejo que o item “Camisa verde” está no carrinho de compras

Scenario: Tentar ver o histórico de compras sem estar logada
Given Eu não estou logada no sistema
And Eu estou na página inicial do sistema
When Eu seleciono “Ver histórico de pedidos”
Then Eu vejo uma mensagem falando que tenho que fazer login para ver o histórico de pedidos
And Eu vejo a página de login
And eu faço o login
And eu vejo o histórico de compras associado a minha conta

Scenario: Selecionar um item indisponível no histórico de compras
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra com o item “Calça roxa”
And Vejo que o item “Calça roxa” não está em estoque no sistema
When Eu seleciono o item “Calça roxa”
Then Eu vejo uma mensagem avisando que esse item não está disponível
And Eu seleciono “Fechar mensagem”
And Eu continuo vendo o histórico de pedidos

Scenario: Clicar em comprar novamente em uma compra em que a quantidade de um mesmo item em estoque é menor do que a quantidade comprada anteriormente
Given Eu estou logada no sistema como cliente com o login “aqrs” e senha “1234”
And Estou vendo o histórico de pedidos da minha conta
And Vejo uma compra de 3 unidades do item “Calça verde”
And Vejo que há apenas 2 unidade do item “Calça verde” em estoque
When Eu seleciono “comprar novamente”
Then Eu vejo uma mensagem informando que não há unidades suficientes do item “Calça verde” em estoque
And Eu vejo que 2 unidades do item “Calça verde” estão no carrinho de compras
And Eu compro 2 unidades do item “Calça verde”
