Feature: Login
	As a usuário do sistema
	I want to ser capaz de realizar um login no sistema
	So that eu possa realizar ações e atividades na plataforma através da minha conta criada

Scenario: Login com dados corretos
	Given eu estou na pagina "Login"
	And o email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "#qwe12345678"
	When eu digito o email "jvs2@cin.ufpe.br" em "Email"
	And eu digito a senha "#qwe12345678" em "Senha"
	And eu clico em "Entrar"
	Then eu sou redirecionado para a página "Principal"
	And eu estou logado no sistema

Scenario: Login com usuário não existente
	Given eu estou na pagina "Login"
	And o email "jvs1@cin.ufpe.br" não foi cadastrado no sistema
	When eu digito o email "jvs1@cin.ufpe.br" em "Email"
	And eu digito a senha "#qwer12345678" em "Senha"
	And eu clico em "Entrar"
	Then eu recebo uma mensagem de erro informando que o usuário não existe
	And eu continuo na página "Login"
	And eu não estou logado no sistema

Scenario: Login com senha errada
	Given eu estou na pagina "Login"
	And o email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "#qwe12345678"
	When eu digito o email "jvs2@cin.ufpe.br" em "Email"
	And eu digito a senha "12345678" em "Senha"
	And eu clico em "Entrar"
	Then eu recebo uma mensagem de erro informando que a senha ou email estão errados
	And o botão "Entrar" fica desativado
	And a senha é apagada
	And eu continuo na página "Login"
	And eu não estou logado no sistema

Scenario: Solicitação de recuperação de conta
	Given eu estou na pagina "Recuperar Conta"
	And o email "jvs2@cin.ufpe.br" já foi cadastrado com a senha "#qwe12345678"
	When eu digito o email "jvs2@cin.ufpe.br" em "Email"
	And eu clico em "Enviar"
	Then eu recebo uma mensagem de que o email foi enviado com sucesso

Scenario: Deslogar
	Given eu já estou logado no sistema
	And eu estou na pagina "Principal"
	When eu clico em "Logout"
	Then eu sou redirecionado para a página "Inicial"
	And eu não estou logado no sistema

Scenario: Sessão atual fechada
	Given eu já estou logado no sistema
	And eu estou na pagina "Principal"
	When eu fecho a minha sessão atual e saio do site
	Then eu não estou logado no sistema

Scenario: Tentativa de login quando já está logado
	Given eu já estou logado no sistema
	When eu vou para a página "Login"
	Then eu sou redirecionado para a página "Principal"
	And eu estou logado no sistema

Scenario: Redefinição de senha 
	Given eu estou na pagina "Redefinir Senha"
	And eu tenho um link válido para o email "jvs2@cin.ufpe.br"
	And eu digito a senha "#qwer87654321" em "Nova Senha"
	And eu digito a senha "#qwer87654321" em "Repetir Senha"
	And eu clico em "Redefinir"
	Then eu recebo uma mensagem informando que minha senha foi atualizada
	And a senha do email "jvs2@cin.ufpe.br" foi alterada para "#qwer87654321"

Scenario: Número de tentativas de login excedidas
	Given eu já tentei logar com dados errados 10 vezes
	And eu estou na pagina "Login"
	When eu digito o email "jvs2@cin.ufpe.br" em "Email"
	And eu digito a senha "12345678" em "Senha"
	And eu clico em "Entrar"
	Then eu recebo uma mensagem informando que eu excedi o limite de tentativas