Feature: Criação de categorias de itens
    As a Administrador do sistema
    I want to Criar novas categorias e editar a descrição de categorias existentes
    So that Itens podem ser categorizados

Scenario: Criar uma nova categoria
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página de "Gerenciar categorias"
    And Eu não vejo nenhuma categoria de "Esportes" cadastrada no sistema
    When Eu seleciono a opção "Adicionar nova categoria"
    And Eu adiciono uma categoria de "Esportes"
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Categoria adicionada com sucesso"
    And Eu vejo a categoria "Esportes" na página de "Gerenciar categorias"

Scenario: Erro ao tentar criar uma categoria já existente
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página de "Gerenciar categorias"
    And Eu vejo uma categoria de "Esportes" cadastrada no sistema
    When Eu seleciono a opção "Adicionar nova categoria"
    And Eu tento adicionar uma nova categoria de "Esportes"
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Erro, categoria já existente"
    And Eu volto para a página de "Gerenciar categorias"

Scenario: Erro ao tentar criar uma nova categoria sem nome
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página de "Gerenciar categorias"
    When Eu seleciono a opção "Adicionar nova categoria"
    And Eu tento adicionar uma nova categoria sem nenhum nome
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Erro, categoria precisa de um nome"
    And Eu volto para a página de "Gerenciar categorias"

Scenario: Cancelar a adição de uma nova categoria
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página de "Gerenciar categorias"
    And Eu não vejo nenhuma categoria de "Esportes" cadastrada no sistema
    When Eu seleciono a opção "Adicionar nova categoria"
    And Eu adiciono uma categoria de "Esportes"
    And Eu seleciono a opção "Cancelar"
    Then Eu vejo uma mensagem de "Nenhuma categoria foi criada"
    And Eu vejo não existe a categoria "Esportes" na página de "Gerenciar categorias"

Scenario: Editar a descrição de uma categoria
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página da categoria "Esportes"
    And A categoria "Esportes" possui a descrição "Acessórios para exercícios físicos"
    When Eu seleciono a opção "Editar descrição"
    And Eu modifico a informação para "Itens utilizados durante a prática de atividades físicas"
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Descrição alterada com sucesso"
    And Eu vejo a descrição "Itens utilizados durante a prática de atividades físicas" na página da categoria "Esportes"

Scenario: Remover a descrição de uma categoria
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página da categoria "Esportes"
    And A categoria "Esportes" possui a descrição "Itens utilizados durante a prática de atividades físicas"
    When Eu seleciono a opção "Editar descrição"
    And Eu removo a informação "Itens utilizados durante a prática de atividades físicas"
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Descrição alterada com sucesso"
    And Eu vejo que não há nenhuma descrição na página da categoria "Esportes"

Scenario: Erro ao tentar editar a descrição de uma categoria sem alterar suas informações
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página da categoria "Esportes"
    And A categoria "Esportes" possui a descrição "Itens utilizados durante a prática de atividades físicas"
    When Eu seleciono a opção "Editar descrição"
    And Eu mantenho a informação como "Itens utilizados durante a prática de atividades físicas"
    And Eu seleciono a opção "Confirmar"
    Then Eu vejo uma mensagem de "Erro. A descrição é igual à anterior."
    And Eu vejo que a categoria "Esportes" continua com a descrição "Itens utilizados durante a prática de atividades físicas"
    And Eu estou na página da categoria "Esportes"

Scenario: Cancelar a edição da descrição de uma categoria
    Given Eu estou logado como "Administrador" com o login "login"
    And Eu estou na página da categoria "Esportes"
    And A categoria "Esportes" possui a descrição "Itens utilizados durante a prática de atividades físicas"
    When Eu seleciono a opção "Editar descrição"
    And Eu seleciono a opção "Cancelar"
    Then Eu vejo uma mensagem de "Edição de descrição cancelada"
    And Eu vejo que a categoria "Esportes" continua com a descrição "Itens utilizados durante a prática de atividades físicas"