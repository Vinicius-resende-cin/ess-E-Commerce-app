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

Scenario: Removendo um produto
Given eu já estou logado no sistema como "elsj@cin.ufpe.br" com a senha "13032003jR!"
And eu estou na pagina "Minha Loja"
When eu clico no icone que indica "Remover produto" do produto com nome "Camisa polo azul bebe"
Then eu sou redirecionado para a página de confirmacao de senha
And eu digito "13032003jR!" em "Senha"
And eu clico em "Confirmar"
Then eu sou redirecionado para a página "Minha Loja"
And eu vejo que o produto com nome "Camisa polo azul bebe" foi excluido da loja