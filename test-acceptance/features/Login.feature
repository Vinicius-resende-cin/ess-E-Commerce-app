Feature: Login
	As a usuário do sistema
	I want to ser capaz de realizar um login no sistema
	So that eu possa realizar ações e atividades na plataforma através da minha conta criada

Scenario: Login com dados corretos
	Given Eu estou na página de login
	And O email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "qwe12345678"
	When Eu digito o meu email "jvs2@cin.ufpe.br" em "Email"
	And Eu digito minha senha "qwe12345678" em "Senha"
	And Eu clico em "Entrar"
	Then Eu sou redirecionado para a página principal
	And Vejo uma mensagem de "Login realizado com sucesso"
	And O meu nome "João Victor da Silva" é exibido no canto superior direito da página

Scenario: Login com usuário não existente
	Given Eu estou na página de login
	And O email "jvs2@cin.ufpe.br" não foi cadastrado no sistema
	When Eu digito o email "jvs20@cin.ufpe.br" em "Email"
	And Eu digito a senha "qwer12345678" em "Senha"
	And Eu clico em "Entrar"
	Then Eu recebo uma mensagem de erro informando que o usuário não existe
	And Eu continuo na página de login
	And Não sou logado no sistema

Scenario: Login com senha errada
	Given Eu estou na página de login
	And O email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "qwe12345678"
	When Eu digito um email existente "jvs2@cin.ufpe.br" em "Email"
	And Eu digito uma senha errada "12345678" em "Senha"
	And Eu clico em "Entrar"
	Then Eu recebo uma mensagem de erro "Senha incorreta"
	And O botão "entrar" fica desativado
	And A senha é apagada
	And Eu continuo na página de login
	And Não sou logado no sistema
	
Scenario: Solicitação de recuperação de senha
	Given Eu estou na página de "Recuperar Senha"
	And O email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "qwe12345678"
	When Eu insiro meu endereço de e-mail "jvs2@cin.ufpe.br" em "Email"
	And Clico em "Enviar"
	Then Eu recebo um e-mail com instruções para recuperar minha senha

Scenario: 
	Given Eu estou na página de "Redefinição de Senha"
	And Insiro a senha "qwer87654321" em "Nova Senha" e "Repetir Senha"
	And Clico em "Confirmar"
	Then Eu recebo uma mensagem de sucesso informando que minha senha foi atualizada
	And Eu recebo um email avisando que minha senha foi alterada
	And Minha senha foi alterada para "qwer87654321"

Scenario: Número de tentativas de login excedidas
	Given Eu já tentei logar com dados errados 4 vezes
	And O email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "qwe12345678"
	When Eu digito um email existente "jvs2@cin.ufpe.br" em "Email"
	And Eu digito uma senha errada "12345678" em "Senha"
	Then A mensagem "Número de tentativas de login excedido. Por favor, tente novamente mais tarde." é exibida
	And Eu sou impossibilitado de tentar fazer login novamente por 1 hora

Scenario: Deslogar
	Given Eu estou na "Página Inicial"
	And Eu estou logado com o email "jvs2@cin.ufpe.br"
	When Eu clico em "Sair"
	Then Eu sou redirecionado para a página de login
	And Não estou mais logado no sistema
	
Scenario: Sessão atual fechada
	Given Eu estou na "Página Inicial"
	And Eu estou logado com o email "jvs2@cin.ufpe.br"
	When Eu fecho a minha sessão atual e saio do site
	Then Não estou mais logado no sistema

Scenario: Tentativa de login quando já está logado
	Given Eu estou na página de login
	And Eu estou logado com o email "jvs2@cin.ufpe.br"
	When Eu digito o email "outro@cin.ufpe.br" em "Email"
	And Eu digito minha senha "qwe12345678" em "Senha"
	And Eu clico em "Entrar"
	Then A mensagem "Você já está logado" é exibida
	And Eu sou redirecionado para a "Página Inicial"
	And Eu continuo logado com o email "jvs2@cin.ufpe.br"