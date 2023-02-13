Scenario: Gerar um link de compartilhamento personalizado
  Given Eu estou logado como "Cliente" com o login "João"
  And Eu estou na página de venda do produto "Teclado mecânico gamer" da categoria "Eletrônicos"
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  And Eu vejo o campo de "Nome do link"
  And Eu insiro "tecladolegal" no campo de "Nome do link"
  And Eu seleciono a opção "Gerar"
  Then Eu vejo a mensagem "Link copiado para a área de transferência"

Scenario: Erro ao gerar um link de compartilhamento contendo um termo inadequado
  Given Eu estou logado como "Cliente" com o login "Maria"
  And Eu estou na página de venda do produto "Mouse de sensor a laser" da categoria "Eletrônicos"
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  And Eu vejo o campo de "Nome do link"
  And Eu insiro "ak-47" no campo de "Nome do link"
  And Eu seleciono a opção "Gerar"
  Then Eu vejo a mensagem "Erro: Nome inadequado para link"

Scenario: Erro ao gerar um link de compartilhamento da página de um produto indisponível
  Given Eu estou logado como "Cliente" com o login "Lucas"
  And Eu estou na página de venda do produto "Monitor ultrawide" da categoria "Eletrônicos"
  And O produto "Monitor ultrawide" está esgotado
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  Then Eu vejo a mensagem "Erro: O produto da página está indisponível"
  And A opção "Gerar link de compartilhamento" é desativada

Scenario: Erro ao gerar um link de compartilhamento com um nome grande demais
  Given Eu estou logado como "Cliente" com o login "Ana"
  And Eu estou na página de venda do produto "Headset sem fio" da categoria "Eletrônicos"
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  And Eu vejo o campo de "Nome do link"
  And Eu insiro "headsetsemfiogamermuitolegal12345" no campo de "Nome do link"
  And Eu seleciono a opção "Gerar"
  Then Eu vejo a mensagem "Erro: O nome do link pode ter 15 caracteres no máximo"

Scenario: Erro ao gerar um link de compartilhamento com um nome pequeno demais
  Given Eu estou logado como "Cliente" com o login "José"
  And Eu estou na página de venda do produto "Mousepad gamer" da categoria "Eletrônicos"
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  And Eu vejo o campo de "Nome do link"
  And Eu insiro "mpad" no campo de "Nome do link"
  And Eu seleciono a opção "Gerar"
  Then Eu vejo a mensagem "Erro: O nome do link deve ter 8 caracteres no mínimo"

Scenario: Erro ao gerar um link de compartilhamento da página do carrinho de compras
  Given Eu estou logado como "Cliente" com o login "Beatriz"
  And Eu estou na página de "Carrinho de compras"
  And Eu estou com o menu geral aberto
  When Eu seleciono a opção "Gerar link de compartilhamento"
  Then Eu vejo a mensagem "Erro: Não é possível gerar um link desta página"
  And A opção "Gerar link de compartilhamento" é desativada
