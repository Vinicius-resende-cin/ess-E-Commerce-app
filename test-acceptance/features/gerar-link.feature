Feature: Gerar link de compartilhamento personalizado
  As a Cliente do Sistema
  I want to criar um link de compartilhamento personalizado
  So that Eu posso compartilhar mais facilmente páginas do sistema

Scenario: Sucesso ao gerar um link de compartilhamento de um produto válido
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link" <-
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home/item/6429c84825afe95774cf5e47" no campo "Link original" <-
  And eu insiro "SaiaLaranja" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar" <-
  Then eu vejo a mensagem "Sucesso: Link copiado para a área de transferência." <-
  And o link "http://localhost:4200/home/item/6429c84825afe95774cf5e47?name=commerCin-SaiaLaranja" está salvo no sistema <-

Scenario: Sucesso ao gerar um link de compartilhamento da página home
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home" no campo "Link original"
  And eu insiro "PaginaHome" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Sucesso: Link copiado para a área de transferência."
  And o link "http://localhost:4200/home?name=commerCin-PaginaHome" está salvo no sistema

Scenario: Erro ao gerar um link de compartilhamento sem nome
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home" no campo "Link original"
  And eu insiro "" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: O nome do link não pode ser vazio."

Scenario: Erro ao gerar um link de compartilhamento com um nome pequeno demais
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home/item/6429c88225afe95774cf5e49" no campo "Link original"
  And eu insiro "Sapato" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: O nome do link deve ter 8 caracteres no mínimo."

Scenario: Erro ao gerar um link de compartilhamento com um nome grande demais
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home/item/6429c86325afe95774cf5e48" no campo "Link original"
  And eu insiro "JaquetaAmarelaMuitoLegal" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: O nome do link pode ter 15 caracteres no máximo."

Scenario: Erro ao gerar um link de compartilhamento da página do histórico de pedidos
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "http://localhost:4200/home/historico-pedidos" no campo "Link original"
  And eu insiro "MeuHistorico" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: Não é possível gerar um link desta página."

Scenario: Erro ao gerar um link de compartilhamento de um outro site
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  When eu insiro "https://www.mercadolivre.com.br/" no campo "Link original"
  And eu insiro "MercadoLivre" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: Não é possível gerar um link desta página."

Scenario: Erro ao gerar um link de compartilhamento já existente
  Given eu estou logado com login "ecommercin@gmail.com" e senha "comercio2023@"
  And eu estou na página "Gerar link"
  And eu vejo o campo "Link original"
  And eu vejo o campo "Nome do novo link"
  And eu insiro "http://localhost:4200/home" no campo "Link original"
  And eu insiro "PaginaHome" no campo "Nome do novo link"
  And eu seleciono a opção "Gerar"
  Then eu vejo a mensagem "Erro: Não foi possível gerar o link."
  And o link "http://localhost:4200/home?name=commerCin-PaginaHome" está salvo no sistema