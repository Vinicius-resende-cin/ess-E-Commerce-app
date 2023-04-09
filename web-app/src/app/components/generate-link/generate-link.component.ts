import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss']
})
export class GenerateLinkComponent {
  constructor() {}

  ngOnInit() {}

  goBack() {
    window.history.back();
  }

  copyToClipboard(inputElement: HTMLInputElement) {
    inputElement.select();

    if (inputElement.value.length == 0) {
      alert('Erro: o nome do link não pode ser vazio.');
    } else if (inputElement.value.length < 8) {
      alert('Erro: O nome do link deve ter 8 caracteres no mínimo.');
    } else if (inputElement.value.length > 15) {
      alert('Erro: O nome do link pode ter 15 caracteres no máximo.');
    } else {
      navigator.clipboard.writeText(inputElement.value);
      alert('Link copiado para a área de transferência.');
    }
  }
}
