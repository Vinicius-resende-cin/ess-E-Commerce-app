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

  // Obtém o nome do link original e do link personalizado a partir dos elementos de
  // entrada HTML e gera um link personalizado
  private generateCustomLink(linkOriginal: string, nomeLink: string): { id: number, url: string } | void {
    const siteOriginal = linkOriginal.slice(0, 21);
    const caminhoOriginal = linkOriginal.slice(22);

    const caminhoItem = new RegExp("\\*item\\/\\*");
    const caminhoHome = "home";

    if (siteOriginal != "http://localhost:4200" &&
        caminhoOriginal != caminhoHome &&
        !(caminhoItem.test(caminhoOriginal))) {
      alert('Erro: Não é possível gerar um link desta página.');
    } else {

      if (nomeLink.length == 0) {
        alert('Erro: O nome do link não pode ser vazio.');
      } else if (nomeLink.length < 8) {
        alert('Erro: O nome do link deve ter 8 caracteres no mínimo.');
      } else if (nomeLink.length > 15) {
        alert('Erro: O nome do link pode ter 15 caracteres no máximo.');
      } else {
        const id: number = this.hash(nomeLink); // Usa a função hash para gerar o id do link
        const urlOriginal = new URL(linkOriginal); // Cria um objeto URL a partir da URL original
        const params = urlOriginal.searchParams;
        params.set("name", `commerCin-${nomeLink}`);
        const url = `${urlOriginal.origin}${urlOriginal.pathname}?${params.toString()}${urlOriginal.hash}`; // Composição do novo link customizado
        return { id, url };
      }
    }
  }

  // Gera um link personalizado a partir dos elementos de entrada HTML e copia para a área de transferência
  generateAndCopyCustomLink(input1: HTMLInputElement, input2: HTMLInputElement) {
    input1.select();
    input2.select();

    const ret = this.generateCustomLink(input1.value, input2.value);
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
