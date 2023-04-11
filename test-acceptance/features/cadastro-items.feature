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
