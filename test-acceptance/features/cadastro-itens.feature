Feature: Cadastro e Manutenção de Produto
    As a usuário admin do sistema
    I want to adicionar, remover e atualizar produto
    So that a loja pertencente a conta seja atualizada

Scenario: Cadastrando novo produto
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
When eu estou na pagina "Cadastrar Produto"
And eu digito "Camisa polo" em "Nome"
And eu digito "Camisa polo preta esportiva com bom pano" em "Descricao"
And eu digito "80" em "Preco"
And eu digito "20" em "Quantidade"
And eu escolho "Cartao de credito e Boleto bancario" em "Formas de pagamento"
And eu escolho "Roupas" em "Categorias"
And eu clico em "Cadastrar"
Then eu sou redirecionado para a página "Minha Loja"
And eu vejo o produto com nome "Camisa polo" na loja

Scenario: Tentativa mal-sucedida de cadastro de novo produto com título já existente
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
When eu estou na pagina "Cadastrar Produto"
And eu digito "Camisa polo" em "Nome"
And eu digito "Camisa polo azul" em "Descricao"
And eu digito "20" em "Preco"
And eu digito "10" em "Quantidade"
And eu escolho "Transferencia bancaria" em "Formas de pagamento"
And eu escolho "Corrida" em "Categorias"
And eu clico em "Cadastrar"
Then eu vejo na tela uma mensagem de erro "Já existe um produto com esse titulo em sua loja"
And eu clico em "Itens"
And eu sou redirecionado para a página "Minha Loja"
And eu vejo o produto com nome "Camisa polo" na loja
And eu clico em "Ver tudo"
And eu sou redirecionado para a página do produto com nome "Camisa polo"
And eu vejo "Camisa polo" em "Nome"
And eu vejo "Camisa polo preta esportiva com bom pano" em "Descricao"
And eu vejo "80" em "Preco"
And eu vejo "20" em "Quantidade"
And eu vejo "Cartao de credito e Boleto bancario" em "Formas de pagamento"
And eu vejo "Roupas" em "Categorias"

Scenario: Tentativa mal-sucedida de cadastro de novo produto deixando algum campo obrigatório em branco
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
When eu estou na pagina "Cadastrar Produto"
And eu digito "Calca legging" em "Nome"
And eu digito "Uma calca com otima fibra para malhacao" em "Descricao"
And eu digito "20" em "Preco"
And eu digito "10" em "Quantidade"
Then eu vejo o botão "Cadastrar" indisponivel para clicar
And eu clico em "Itens"
And eu sou redirecionado para a página "Minha Loja"
And eu vejo que o produto com nome "Calca legging" nao esta na loja

Scenario: Tentativa mal-sucedida de cadastro de novo produto com campos negativos
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
When eu estou na pagina "Cadastrar Produto"
And eu digito "Casaco de veludo" em "Nome"
And eu digito "Casaco elegante com disponbilidade de varias cores" em "Descricao"
And eu digito "-3" em "Preco"
And eu digito "-19" em "Quantidade"
And eu escolho "Transferencia bancaria" em "Formas de pagamento"
And eu escolho "Roupas" em "Categorias"
And eu clico em "Cadastrar"
Then eu vejo na tela uma mensagem de erro "Valores negativos não são permitidos"
And eu clico em "Itens"
And eu sou redirecionado para a página "Minha Loja"
And eu vejo que o produto com nome "Casaco de veludo" nao esta na loja

Scenario: Atualizando um produto
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
And eu estou na pagina "Minha Loja"
And eu clico no icone que indica "Atualizar produto" do produto com nome "Camisa polo"
When eu altero "Nome" para "Camisa polo azul bebe"
And eu altero "Formas de pagamento" para "Boleto bancario"
And eu altero "Categorias" para "Corrida"
And eu clico em "Atualizar"
Then eu sou redirecionado para a página "Minha Loja"
And eu vejo o produto com nome "Camisa polo azul bebe" na loja
And eu clico em "Ver tudo"
And eu sou redirecionado para a página do produto com nome "Camisa polo azul bebe"
And eu vejo "Boleto bancario" em "Formas de pagamento"
And eu vejo "Corrida" em "Categorias"

Scenario: Tentativa mal-sucedida de atualizar um produto com titulo já existente
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
And eu estou na pagina "Minha Loja"
And eu clico no icone que indica "Atualizar produto" do produto com nome "Camisa polo azul bebe"
When eu altero "Nome" para "Botas Vermelhas do Astro Boy"
And eu altero "Formas de pagamento" para "Cartao de credito"
And eu altero "Categorias" para "Moda"
And eu clico em "Atualizar"
Then eu vejo na tela uma mensagem de erro "Já existe um produto com esse titulo em sua loja"
And eu clico em "Itens"
And eu sou redirecionado para a página "Minha Loja"
And eu vejo o produto com nome "Camisa polo azul bebe" na loja

Scenario: Tentativa mal-sucedida de atualizar um produto com campos negativos
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
And eu estou na pagina "Minha Loja"
And eu clico no icone que indica "Atualizar produto" do produto com nome "Camisa polo azul bebe"
When eu altero "Quantidade" para "-2"
And eu altero "Formas de pagamento" para "Cartao de credito"
And eu altero "Categorias" para "Moda"
And eu clico em "Atualizar"
Then eu vejo na tela uma mensagem de erro "Valores negativos não são permitdos"
And eu clico em "Itens"
And eu sou redirecionado para a página "Minha Loja"
And eu vejo o produto com nome "Camisa polo azul bebe" na loja
And eu clico em "Ver tudo"
And eu sou redirecionado para a página do produto com nome "Camisa polo azul bebe"
And eu vejo "20" em "Quantidade"
And eu vejo "Boleto bancario" em "Formas de pagamento"
And eu vejo "Corrida" em "Categorias"

Scenario: Removendo um produto
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
And eu estou na pagina "Minha Loja"
When eu clico no icone que indica "Remover produto" do produto com nome "Camisa polo azul bebe"
Then eu sou redirecionado para a página de confirmacao de senha
And eu digito "13032003jR!" em "Senha"
And eu clico em "Confirmar"
Then eu sou redirecionado para a página "Minha Loja"
And eu vejo que o produto com nome "Camisa polo azul bebe" nao esta na loja