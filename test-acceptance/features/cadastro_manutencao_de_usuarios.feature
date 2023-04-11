Feature: Gerenciar as contas de usuários
    As a Administrador do Sistema
    I want to gerenciar as contas dos usuários
    So that Usuários podem ser cadastrados e gerenciados

Scenario: Cadastrar um novo Usuário
    Given eu estou na pagina "Cadastro_Usuario"
    When Escrevo "Guilherme Maciel de Melo" em "nomecompleto" 
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail" 
    And Escrevo "gmm7@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "123456Gui@" em "senha" 
    And Escrevo "123456Gui@" em "confirmacaosenha" 
    And Escrevo "123.456.789-10" em "CPF" 
    And Escrevo "99999-9999" em "celular" 
    And Escrevo "07/02/2002" em "data de nascimento" 
    And Escrevo "PE" em "estado" 
    And Escrevo "Recife" em "cidade" 
    And Escrevo "Rua General Vargas" em "endereco" 
    And Escrevo "Casa" em "Complemento" 
    And Escrevo "45989-485" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de sucesso, "Usuário Cadastrado no Sistema"

Scenario: Tentiva mal-sucedida ao Cadastrar um novo Usuário, senha com menos de 8 dígitos 
    Given eu estou na pagina "Cadastro_Usuario"
    When Escrevo "Joaquim Maria Machado de Assis" em "nomecompleto" 
    And Escrevo "jmma@cin.ufpe.br" em "e-mail" 
    And Escrevo "jmma@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "123jm@" em "senha" 
    And Escrevo "123jm@" em "confirmacaosenha" 
    And Escrevo "093.459.090-79" em "CPF" 
    And Escrevo "21 2572-55949" em "celular" 
    And Escrevo "21/06/1908" em "data de nascimento" 
    And Escrevo "RJ" em "estado" 
    And Escrevo "Rio de Janeiro" em "cidade" 
    And Escrevo "Rua Rubens Pinto" em "endereco" 
    And Escrevo "Casa" em "Complemento" 
    And Escrevo "78085-730" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de erro, "Senha Inválida"

Scenario: Cadastrar um novo Usuário
    Given eu estou na pagina "Cadastro_Usuario"
    When Escrevo "Joaquim Maria Machado de Assis" em "nomecompleto" 
    And Escrevo "jmma@cin.ufpe.br" em "e-mail" 
    And Escrevo "jmma@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "12356jm@" em "senha" 
    And Escrevo "12356jm@" em "confirmacaosenha" 
    And Escrevo "093.459.090-79" em "CPF" 
    And Escrevo "21 2572-55949" em "celular" 
    And Escrevo "21/06/1908" em "data de nascimento" 
    And Escrevo "RJ" em "estado" 
    And Escrevo "Rio de Janeiro" em "cidade" 
    And Escrevo "Rua Rubens Pinto" em "endereco" 
    And Escrevo "Casa" em "Complemento" 
    And Escrevo "78085-730" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de sucesso, "Usuário Cadastrado no Sistema"

 Scenario: Tentiva mal-sucedida ao Cadastrar um novo Usuário, e-mail já utilizado 
    Given eu estou na pagina "Cadastro_Usuario"
    And O sistema já possui "e-mail" "gmm7@cin.ufpe.br" já cadastrado
    When Escrevo "Gustavo Marcílio de Melo" em "nomecompleto" 
    And Escrevo "gmm7@cin.ufpe.br" em "e-mail" 
    And Escrevo "gmm7@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "987654I@" em "senha" 
    And Escrevo "987654I@" em "confirmacaosenha" 
    And Escrevo "226.285.440-83" em "CPF" 
    And Escrevo "67 97152-4116" em "celular" 
    And Escrevo "01/04/1999" em "data de nascimento" 
    And Escrevo "MA" em "estado" 
    And Escrevo "São Luís" em "cidade" 
    And Escrevo "Rua Doutor Dino Silva" em "endereco" 
    And Escrevo "Número 5" em "Complemento" 
    And Escrevo "65060-352" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de erro, "E-mail inválido"

 Scenario: Cadastrar um novo Usuário
    Given eu estou na pagina "Cadastro_Usuario"
    When Escrevo "Gustavo Marcílio de Melo" em "nomecompleto" 
    And Escrevo "gmm8@cin.ufpe.br" em "e-mail" 
    And Escrevo "gmm8@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "987654I@" em "senha" 
    And Escrevo "987654I@" em "confirmacaosenha" 
    And Escrevo "226.285.440-83" em "CPF" 
    And Escrevo "67 97152-4116" em "celular" 
    And Escrevo "01/04/1999" em "data de nascimento" 
    And Escrevo "MA" em "estado" 
    And Escrevo "São Luís" em "cidade" 
    And Escrevo "Rua Doutor Dino Silva" em "endereco" 
    And Escrevo "Número 5" em "Complemento" 
    And Escrevo "65060-352" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de sucesso, "Usuário Cadastrado no Sistema"

Scenario: Tentiva mal-sucedida ao Cadastrar um novo Usuário, CPF já utilizado
    Given eu estou na pagina "Cadastro_Usuario"
    And O sistema já possui "CPF" "123.456.789-10" já cadastrado
    When Escrevo "Gabriel Maciel Marcedo" em "nomecompleto" 
    And Escrevo "gabrielmm@cin.ufpe.br" em "e-mail" 
    And Escrevo "gabrielmm@cin.ufpe.br" em "confirmacaoe-mail" 
    And Escrevo "987654G@" em "senha" 
    And Escrevo "987654G@" em "confirmacaosenha" 
    And Escrevo "123.456.789-10" em "CPF" 
    And Escrevo "35 96862-0431" em "celular" 
    And Escrevo "08/02/2000" em "data de nascimento" 
    And Escrevo "AL" em "estado" 
    And Escrevo "Maceió" em "cidade" 
    And Escrevo "5ª Travessa Antônio Sabino de Sá" em "endereco" 
    And Escrevo "Apto101" em "Complemento" 
    And Escrevo "57039-889" em "CEP" 
    And Clico em "FinalizarCadastro"
    Then Eu recebo uma mensagem de erro, "CPF inválido"

Scenario: Usuário, já logado no sistema, deseja mudar sua senha
    Given eu já estou logado no sistema como "gmm7@cin.ufpe.br" com a senha "123456Gui@"
    And eu estou na pagina "Perfil do Usuario"
    When Clico em "alterar-senha"
    And Escrevo "123456Gui@" em "Senha-Atual"
    And Escrevo "98765Gui@" em "Nova-Senha"
    And Escrevo "98765Gui@" em "Confirmar-Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de sucesso, "Senha foi alterada com sucesso"

Scenario: Tentiva mal-sucedida do Usuário, já logado no sistema tenta trocar sua senha, erra sua senha atual
    Given eu já estou logado no sistema como "jmma@cin.ufpe.br" com a senha "12356jm@"
    And eu estou na pagina "Perfil do Usuario"
    When Clico em "alterar-senha"
    And Escrevo "12356jm" em "Senha-Atual"
    And Escrevo "987654jm@" em "Nova-Senha"
    And Escrevo "987654jm@" em "Confirmar-Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "Senha inserida está incorreta"

Scenario: Tentiva mal-sucedida do Usuário, já logado no sistema tenta trocar sua senha, coloca uma senha invállida
    Given eu já estou logado no sistema como "jmma@cin.ufpe.br" com a senha "12356jm@"
    And eu estou na pagina "Perfil do Usuario"
    When Clico em "alterar-senha"
    And Escrevo "12356jm@" em "Senha-Atual"
    And Escrevo "987654Jm" em "Nova-Senha"
    And Escrevo "987654Jm" em "Confirmar-Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "A nova senha não segue as regras para criação de senha"
    
Scenario: Usuário, já logado no sistema, deseja mudar seu endereço
    Given eu já estou logado no sistema como "gmm8@cin.ufpe.br" com a senha "987654I@"
    And eu estou na pagina "Perfil do Usuario"
    When Clico em "alterar-endereco"
    And Escrevo "CE" em "estado" 
    And Escrevo "Fortaleza" em "cidade" 
    And Escrevo "Travessa Argila" em "endereco" 
    And Escrevo "Casa 404" em "Complemento" 
    And Escrevo "60540-471" em "CEP"
    And Clico na opcao "OK"
    And Escrevo "987654I@" em "senha-atual"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de sucesso, "As informações do endereço foi alterada com sucesso"

Scenario: Usuário, já logado no sistema, deseja mudar seu endereço, mas insere sua senha errada
    Given eu já estou logado no sistema como "gmm8@cin.ufpe.br" com a senha "987654I@"
    And eu estou na pagina "Perfil do Usuario"
    When Clico em "alterar-endereco"
    And Escrevo "CE" em "estado" 
    And Escrevo "Fortaleza" em "cidade" 
    And Escrevo "Travessa Argila" em "endereco" 
    And Escrevo "Casa 404" em "Complemento" 
    And Escrevo "60540-471" em "CEP"
    And Clico na opcao "OK"
    And Escrevo "987654I" em "senha-atual"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "Senha inserida está incorreta"
   

Scenario: Administrador deseja remover um usuário do sistema 
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Gustavo Marcílio de Melo", "226.285.440-83" em "CPF", "gmm8@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    When Eu clico no Botão "X" do usuário "226.285.440-83"
    And Escrevo "comercio2023@" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de sucesso, "Usuário Removido com sucesso"

Scenario: Tentiva mal-sucedida do administrador ao colocar sua senha quando quer remover um usuário do sistema
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    When Eu clico no Botão "X" do usuário "123.456.789-10"
    And Escrevo "comercio2023" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "Senha inserida está incorreta"

Scenario: Administrador deseja Promover um usuário do sistema 
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "usuario"
    When Eu clico no Botão "admin/usuario" do usuário "123.456.789-10"
    And Escrevo "comercio2023@" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de sucesso, "Usuário Teve a permissão alterada com sucesso"
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "admin"

Scenario: Tentiva mal-sucedida do administrador ao colocar sua senha quando quer rebaixar um administrador a usuário
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "admin"
    When Eu clico no Botão "admin/usuario" do usuário "123.456.789-10"
    And Escrevo "comercio2023" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "Senha inserida está incorreta"
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "admin"


Scenario: Administrador deseja rebaixar um administrador do sistema 
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "admin"
    When Eu clico no Botão "admin/usuario" do usuário "123.456.789-10"
    And Escrevo "comercio2023@" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de sucesso, "Usuário Teve a permissão alterada com sucesso"
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "usuario"


Scenario: Tentiva mal-sucedida do administrador ao colocar sua senha quando quer promover um usuário a administrador
    Given eu já estou logado no sistema como "ecommercin@gmail.com" com a senha "comercio2023@"
    And eu estou na pagina "Admin Painel"
    And Eu vejo o usuário de "nome" "Guilherme Maciel de Melo", "123.456.789-10" em "CPF", "gmm7@cin.ufpe.br" em "e-mail" na tabela de usuários do sistema
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "usuário"
    When Eu clico no Botão "admin/usuario" do usuário "123.456.789-10"
    And Escrevo "comercio2023" em "Senha"
    And Clico na opcao "OK"
    Then Eu recebo uma mensagem de erro, "Senha inserida está incorreta"
    And Verifico que este usuário de "CPF" "123.456.789-10" possui a permissao de "usuário"





