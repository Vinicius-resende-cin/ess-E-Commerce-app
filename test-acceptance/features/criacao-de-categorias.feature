Feature: Criação de categorias de itens
    As a Administrador do sistema
    I want to Criar novas categorias e editar a descrição de categorias existentes
    So that Itens podem ser categorizados

Scenario: Criar uma nova categoria
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Gerenciar categorias"
    And eu não vejo nenhuma categoria de "CategoriaTeste" cadastrada no sistema
    When eu seleciono a opção "Nova Categoria"
    And eu adiciono uma categoria de "CategoriaTeste" com descrição "Teste de categoria"
    And eu seleciono a opção "Adicionar"
    Then eu vejo uma mensagem de "Categoria criada com sucesso"
    And eu seleciono a opção "Voltar"
    And eu estou na pagina "Gerenciar categorias"
    And eu vejo uma categoria de "CategoriaTeste" cadastrada no sistema

Scenario: Erro ao tentar criar uma categoria já existente
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Gerenciar categorias"
    And eu vejo uma categoria de "CategoriaTeste" cadastrada no sistema
    When eu seleciono a opção "Nova Categoria"
    And eu adiciono uma categoria de "CategoriaTeste" com descrição "Teste de categoria"
    And eu seleciono a opção "Adicionar"
    Then eu vejo uma mensagem de "Categoria já existe"
    And eu seleciono a opção "Voltar"
    And eu estou na pagina "Gerenciar categorias"

Scenario: Erro ao tentar criar uma nova categoria sem nome
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Gerenciar categorias"
    When eu seleciono a opção "Nova Categoria"
    And eu tento adicionar uma nova categoria sem nenhum nome
    And eu seleciono a opção "Adicionar"
    Then eu vejo uma mensagem de "Nome necessário"
    And eu seleciono a opção "Voltar"
    And eu estou na pagina "Gerenciar categorias"

Scenario: Cancelar a adição de uma nova categoria
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Gerenciar categorias"
    And eu não vejo nenhuma categoria de "CategoriaTeste2" cadastrada no sistema
    When eu seleciono a opção "Nova Categoria"
    And eu adiciono uma categoria de "CategoriaTeste2" com descrição "Teste de categoria"
    And eu seleciono a opção "Cancelar"
    Then eu estou na pagina "Gerenciar categorias"
    And eu vejo que a categoria de "CategoriaTeste2" ainda não está cadastrada no sistema

Scenario: Editar a descrição de uma categoria
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na página da categoria "CategoriaTeste"
    And eu vejo que a categoria "CategoriaTeste" possui a descrição "Teste de categoria"
    When eu altero a informação para "Categoria de teste"
    And eu seleciono a opção "Confirmar"
    Then eu vejo uma mensagem de "Descrição alterada com sucesso"
    And eu seleciono a opção "Voltar"
    And eu estou na pagina "Gerenciar categorias"
    And eu vejo a descrição "Categoria de teste" na categoria "CategoriaTeste"

Scenario: Erro ao tentar editar a descrição de uma categoria sem alterar suas informações
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na página da categoria "CategoriaTeste"
    And eu vejo que a categoria "CategoriaTeste" possui a descrição "Categoria de teste"
    And eu seleciono a opção "Confirmar"
    Then eu vejo uma mensagem de "Descrição não pode ser a mesma"
    And eu seleciono a opção "Voltar"
    And eu estou na pagina "Gerenciar categorias"
    And eu vejo a descrição "Categoria de teste" na categoria "CategoriaTeste"

Scenario: Cancelar a edição da descrição de uma categoria
    Given o email "ecommercin@gmail.com" já foi cadastrado com a senha "comercio2023@" 
    And eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na página da categoria "CategoriaTeste"
    And eu vejo que a categoria "CategoriaTeste" possui a descrição "Categoria de teste"
    And eu seleciono a opção "Cancelar"
    Then eu estou na pagina "Gerenciar categorias"
    And eu vejo a descrição "Categoria de teste" na categoria "CategoriaTeste"