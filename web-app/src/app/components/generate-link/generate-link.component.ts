import { Component } from '@angular/core';
import { CustomLinksService } from 'src/app/services/customLinks.service';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss']
})
// Componente Angular para a feature 'gerar-link'. Responsável pelo frontend
export class GenerateLinkComponent {
  constructor(
    private customLinksService: CustomLinksService,
  ) {}

  ngOnInit() {}

  // Volta para a página anterior
  goBack() {
    window.history.back();
  }

  // Retorna um hash computado a partir dos caracteres da string passada como
  // parâmetro (uso exclusivamente interno)
  private hash(str: string) {
    var hash = 5381;

    for (var i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }

    return hash >>> 0;
  }

  // Retorna o 'ou exclusivo lógico' de dois booleanos (uso exclusivamente interno)
  private logicalXor(a: boolean, b: boolean) {
    return (a ? !b : b);
  }

  // Cria um popup de alerta com a mensagem passada como argumento e retorna falso (uso exclusivamente interno)
  private alertAndReturnFalse(alertMsg: string): boolean {
    alert(alertMsg);

    return false
  }

  // Verifica se o nome do link original e do link personalizados são válidos (uso exclusivamente interno)
  private validateCustomLink(linkOriginal: string, nomeLink: string): boolean {
    const siteOriginal = linkOriginal.slice(0, 21);
    const caminhoOriginal = linkOriginal.slice(22);

    const urlCommerCin = "http://localhost:4200"
    const caminhoItem = new RegExp(".*\/item\/.*");
    const caminhoHome = "home";

    if (siteOriginal != urlCommerCin ||
        !this.logicalXor((caminhoOriginal == caminhoHome),
                         (caminhoItem.test(caminhoOriginal)))) {
      return this.alertAndReturnFalse("Erro: Não é possível gerar um link desta página.");
    } else if (nomeLink.length == 0) {
      return this.alertAndReturnFalse("Erro: O nome do link não pode ser vazio.");
    } else if (nomeLink.length < 8) {
      return this.alertAndReturnFalse("Erro: O nome do link deve ter 8 caracteres no mínimo.");
    } else if (nomeLink.length > 15) {
      return this.alertAndReturnFalse("Erro: O nome do link pode ter 15 caracteres no máximo.");
    }

    return true;
  }

  // Gera um link personalizado a partir do nome do link original e do link personalizado (uso exclusivamente interno)
  private generateCustomLink(linkOriginal: string, nomeLink: string): { id: number, url: string } {
    const id: number = this.hash(nomeLink); // Usa a função hash para gerar o id do link
    const urlOriginal = new URL(linkOriginal); // Cria um objeto URL a partir da URL original
  
    const params = urlOriginal.searchParams;
    params.set("name", `commerCin-${nomeLink}`); // Insere o nome do link personalizado como parâmetro
    const url = `${urlOriginal.origin}${urlOriginal.pathname}?${params.toString()}${urlOriginal.hash}`; // Composição do novo link personalizado

    return { id, url };
  }

  // Obtém o nome do link original e do link personalizado a partir dos elementos de
  // entrada HTML e gera um link personalizado válido (uso exclusivamente interno)
  private generateValidCustomLink(linkOriginal: string, nomeLink: string): { id: number, url: string } | void {
    if (this.validateCustomLink(linkOriginal, nomeLink)) {
      return this.generateCustomLink(linkOriginal, nomeLink);
    }
  }

  // Gera um link personalizado a partir dos elementos de entrada HTML e copia para a área de transferência
  generateAndCopyValidCustomLink(input1: HTMLInputElement, input2: HTMLInputElement) {
    input1.select();
    input2.select();

    const ret = this.generateValidCustomLink(input1.value, input2.value);
    if (ret) {
      const { id, url } = ret;

      this.customLinksService.generateCustomLink(id, url).subscribe(
        (response) => { // Requisição bem-sucedida
          navigator.clipboard.writeText(url); // Copia o link personalizado para a área de transferência
          alert('Sucesso: Link copiado para a área de transferência.');
        },
        (error) => { // Requisição mal-sucedida
          alert('Erro: Não foi possível gerar o link.');
        }
      );
    }
  }
}
