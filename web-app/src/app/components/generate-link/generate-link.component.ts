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

  // Obtém o nome do link base e do link personalizado a partir dos elementos de
  // entrada HTML, gera o link personalizado e copia para a área de transferência
  copyToClipboard(input1: HTMLInputElement, input2: HTMLInputElement) {
    input1.select();
    input2.select();

    if (input2.value.length == 0) {
      alert('Erro: O nome do link não pode ser vazio.');
    } else if (input2.value.length < 8) {
      alert('Erro: O nome do link deve ter 8 caracteres no mínimo.');
    } else if (input2.value.length > 15) {
      alert('Erro: O nome do link pode ter 15 caracteres no máximo.');
    } else {
      const id: number = this.hash(input2.value); // Usa a função hash para gerar o id do link
      const url: string = `http://commerCin-${input2.value}.${input1.value.slice(7)}`; // composição do link personalizado

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
