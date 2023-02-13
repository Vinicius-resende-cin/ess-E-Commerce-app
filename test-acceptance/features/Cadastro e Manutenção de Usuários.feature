Feature: Como um E-commerce
    Eu quero registrar usuários e Administradores
    Para que eu possa realizar compras e cadastrar produtos

Scenario: Cadastrar um novo Usuário
    Given Eu estou na página de "Cadastrar novo Cliente"
    When Escrevo "Guilherme Maciel de Melo" em "Nome"
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail"
    And Escrevo "123456Gui" em "Senha"
    And Escrevo "123.456.789-10" em "CPF"
    And Escrevo "99999-9999" em "Telefone"
    And Escrevo "PE" em "estado"
    And Escrevo "Recife" em "Cidade"
    And Escrevo "345" em "numero"
    And Escrevo "Rua General Vargas" em "Endereço"
    And Escrevo "Casa" em "Complemento"
    And Clico em "Cadastrar"
    Then Eu recebo uma mensagem de cadastro realizado 

Scenario: Usuário, já logado no sistema, deseja mudar sua senha
    Given Eu estou na página de "Informações do Cliente"
    And Eu estou logado com o email "gmm7@cin.ufpe.br" e senha  "123456Gui"
    When Eu clico na opção "Alterar Senha"
    And Escrevo "123456Gui" em "Senha Atual"
    And Escrevo "98765Gui" em "Nova Senha"
    And Escrevo "98765Gui" em "Confirmar Senha"
    And Clico em "Confirmar"
    Then Eu recebo uma mensagem de Senha alterada com Sucesso

Scenario: Administrador deseja remover um usuário do sistema 
    Given Eu estou na página de "Painel Admin"
    And Eu estou logado com a conta de administrador default de email  "admin@hotmail.com" e senha  "adminadmin"
    And Vejo uma tabela com os usuários do sistema
    And Eu vejo o usuário de "nome"  "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail"
    When Eu clico no Botão "X" no usuário "Guilherme Maciel de Melo" And: Escrevo  "adminadmin" em "Senha"
    And Clico em "confirmar"
    Then Eu recebo uma mensagem de que o usuário foi excluído
    And Verifico que o usuário "Guilherme Maciel de Melo" não consta mais na tabela

Scenario: Administrador quer promover um usuário a administrador
    Given Eu estou na página de "Painel Admin"
    And Eu estou logado com a conta de administrador default de email  "admin@hotmail.com” e senha  "adminadmin"
    And Vejo uma tabela com os usuários do sistema
    And Eu vejo o usuário de "nome"  "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail"
    When Eu clico no botão "Admin" no usuário "Guilherme Maciel de Melo"
    And Escrevo  "adminadmin" em "Senha"
    And Clico em "confirmar"
    Then Eu recebo uma mensagem de que o usuário virou administrador

Scenario: Administrador default deseja remover outro administrador do sistema
    Given Eu estou na página de "Painel Admin"
    And Eu estou logado com a conta de administrador default de email  "admin@hotmail.com" e senha  "adminadmin"
    And Vejo uma tabela com os usuários do sistema
    And Eu vejo o usuário de "nome"  "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail"
    And Eu vejo que esse usuário já é um administrador
    When Eu clico no botão "X" no usuário "Guilherme Maciel de Melo"
    And Escrevo  "adminadmin" em "Senha"
    And Clico em "confirmar"
    Then Eu recebo uma mensagem de que o usuário foi removido do sisema

Scenario: Tentiva mal-sucedida ao Cadastrar um novo Usuário, senha com menos de 8 dígitos 
    Given Eu estou na página de "Cadastrar novo Cliente"
    When Escrevo "Guilherme Maciel de Melo" em "Nome"
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail"
    And Escrevo "1234Gui" em "Senha"
    And Escrevo "123.456.789-10" em "CPF"
    And Escrevo "99999-9999" em "Telefone"
    And Escrevo "PE" em "estado"
    And Escrevo "Recife" em "Cidade"
    And Escrevo "345" em "numero"
    And Escrevo "Rua General Vargas" em "Endereço"
    And Escrevo "Casa" em "Complemento"
    And Clico em "Cadastrar"
    Then Eu recebo uma mensagem de Erro do cadastro  

Scenario: Tentiva mal-sucedida do administrador ao colocar sua senha quando quer promover um usuário a administrador V
    Given Eu estou na página de "Painel Admin"
    And Eu estou logado com a conta de administrador default de email  "admin@hotmail.com" e senha  "adminadmin"
    And Vejo uma tabela com os usuários do sistema
    And Eu vejo o usuário de "nome"  "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail"
    When Eu clico no botão "Admin" no usuário "Guilherme Maciel de Melo"
    And Escrevo  "admin" em "Senha"
    And Clico em "confirmar"
    Then Eu recebo uma mensagem de que a senha está incorreta

Scenario: Tentiva mal-sucedida ao Cadastrar um novo Usuário, e-mail já utilizado V
    Given Eu estou na página de "Cadastrar novo Cliente"
    And O sistema já possui "e-mail" "gmm7@cin.ufpe.br" já cadastrado
    When Escrevo "Guilherme Maciel de Melo" em "Nome"
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail"
    And Escrevo "123456Gui" em "Senha"
    And Escrevo "123.456.789-10" em "CPF"
    And Escrevo "99999-9999" em "Telefone"
    And Escrevo "PE" em "estado"
    And Escrevo "Recife" em "Cidade"
    And Escrevo "345" em "numero"
    And Escrevo "Rua General Vargas" em "Endereço"
    And Escrevo "Casa" em "Complemento"
    And Clico em "Cadastrar"
    Then Eu recebo uma mensagem de Erro do cadastro, e-mail já utilizado

Scenario: Erro ao Cadastrar um novo Usuário, CPF já utilizado
    Given Eu estou na página de "Cadastrar novo Cliente"
    And O sistema já possui "CPF" "123.456.789-10" já cadastrado
    When Escrevo "Guilherme Maciel de Melo" em "Nome"
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail"
    And Escrevo "123456Gui" em "Senha"
    And Escrevo "123.456.789-10" em "CPF"
    And Escrevo "99999-9999" em "Telefone"
    And Escrevo "PE" em "estado"
    And Escrevo "Recife" em "Cidade"
    And Escrevo "345" em "numero"
    And Escrevo "Rua General Vargas" em "Endereço"
    And Escrevo "Casa" em "Complemento"
    And Clico em "Cadastrar"
    Then Eu recebo uma mensagem de Erro do cadastro, CPF já utilizado

Scenario: Erro Usuário, já logado no sistema tenta trocar sua senha, erra sua senha atual
    Given Eu estou na página de "Informações do Cliente"
    And Eu estou logado com o email "gmm7@cin.ufpe.br" e senha  "123456Gui"
    When Eu clico na opção "Alterar Senha"
    And Escrevo "3456Gui" em "Senha Atual"
    And Escrevo "98765Gui" em "Nova Senha"
    And Escrevo "98765Gui" em "Confirmar Senha"
    And Clico em "Confirmar"
    Then Eu recebo uma mensagem de erro, senha atual errada
