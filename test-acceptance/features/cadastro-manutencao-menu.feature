Feature: Cadastro e Manutenção de Produto
    As a usuário admin do sistema
    I want to adicionar, remover e atualizar produto
    So that a loja pertencente a conta seja atualizada


Scenario: Cadastrando novo produto
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Cadastrar Produto"
And Eu vejo os campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias" vazios
When Eu adiciono as informações "Camisa polo, Camisa polo preta esportiva com bom pano, R$80, camisa.png, Cartão, 20 unidades, Moda" nos campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias"
And Eu clico em "Cadastrar"
And Eu vejo na tela a requisição da senha para concluir o procedimento
And Eu preencho a senha "1234"
Then Eu sou redirecionado para "Minha Loja"
And Eu vejo o novo produto com nome "Camisa polo" cadastrado

Scenario: Atualizando um produto
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Minha Loja"
And Eu clico no ícone de atualizar produto
And Eu estou na página "Atualizar produto"
And Eu vejo as informações "Camisa polo, Camisa polo preta esportiva com bom pano, R$80, camisa.png, Cartão, 20 unidades, Moda" nos campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias"
When Eu altero as informações dos campos "Preço, Disponibilidade" de "R$80, 20 unidades" para "R$100, 10 unidades"
And Eu clico em "Editar"
And Eu vejo na tela a requisição da senha para concluir o procedimento
And Eu preencho a senha "1234"
Then Eu sou redirecionado para "Minha Loja"
And Eu vejo o produto com nome "Camisa polo" alterado com os campos "Preço, Disponibilidade" com os novos valores "R$100, 10 unidades"

Scenario: Removendo um produto
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Remover Produto"
And Eu vejo todos os itens da minha loja
When Eu seleciono o produto com nome "Camisa polo azul" da minha loja que quero remover
And Eu clico em "Remover"
And Eu vejo na tela a requisição da senha para concluir o procedimento
And Eu preencho a senha "1234"
Then Eu sou redirecionado para "Minha Loja"
And Eu vejo o produto com nome "Camisa polo azul" foi excluído da loja

Scenario: Tentativa mal-sucedida de cadastro de novo produto com título já existente
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Cadastrar Produto"
And Eu vejo os campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias" vazios
When Eu adiciono as informações "Camisa polo, Camisa polo preta esportiva com bom pano, R$80, camisa.png, Cartão, 20 unidades, Moda" nos campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias"
And Eu clico em "Cadastrar"
Then Eu vejo na tela uma mensagem de erro "Título já existente"
And Eu clico em "Retornar"
And Eu ainda estou no preenchimento do cadastro do produto

Scenario: Tentativa mal-sucedida de cadastro de novo produto deixando algum campo obrigatório em branco
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Cadastrar Produto"
And Eu vejo os campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias" vazios
When Eu adiciono as informações "Camisa polo, Camisa polo preta esportiva com bom pano, R$80, camisa.png, Cartão, -, Moda" nos campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias"
And Eu clico em "Cadastrar"
Then Eu vejo na tela uma mensagem de erro "Preencha todos os campos obrigatórios"
And Eu ainda estou no preenchimento da atualização do produto

Scenario: Tentativa mal-sucedida de atualizar um produto deixando algum campo obrigatório em branco
Given Estou logado como "Admin" com login "Erlan Lira" e senha "1234"
And Estou na página "Minha Loja"
And Eu clico no ícone que indica "Atualizar produto"
And Eu estou na página "Atualizar produto"
And Eu vejo as informações "Camisa regata, Camisa regata branca esportiva com bom pano, R$120, camisa_regata.png, Dinheiro, 30 unidades, Moda" nos campos "Nome, Descrição, Preço, Foto, Forma de pagamento, Disponibilidade, Categorias"
When Eu altero as informações dos campos "Preço, Disponibilidade" de "R$120, 30 unidades" para "R$80, -"
And Eu clico em "Editar"
Then Eu vejo na tela uma mensagem de erro "Preencha todos os campos obrigatórios"
And Eu ainda estou no preenchimento da atualização do produto
