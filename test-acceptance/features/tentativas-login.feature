Feature: Login2
	As a usuário do sistema
	I want to ser capaz de realizar um login no sistema
	So that eu possa realizar ações e atividades na plataforma através da minha conta criada

Scenario: Número de tentativas de login excedidas
	Given eu já tentei logar com dados errados 10 vezes
	And eu estou na pagina "Login"
	When eu digito o email "jvs2@cin.ufpe.br" em "Email"
	And eu digito a senha "12345678" em "Senha"
	And eu clico em "Entrar"
	Then eu recebo uma mensagem informando que eu excedi o limite de tentativas