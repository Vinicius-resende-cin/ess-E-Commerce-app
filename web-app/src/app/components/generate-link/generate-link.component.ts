import { Component } from '@angular/core';
import { CustomLinksService } from 'src/app/services/customLinks.service';

import { NavigationExtras, NavigationEnd, Router } from '@angular/router';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss']
})
export class GenerateLinkComponent {
  constructor(
    private customLinksService: CustomLinksService,
    private router: Router,
  ) {}

  ngOnInit() {}

  goBack() {
    window.history.back();
  }

  private hash(str: string) {
    var hash = 5381;

    for (var i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }

    return hash >>> 0;
  }

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
      const id: number = this.hash(input2.value);
      const url: string = `http://commerCin-${input2.value}.${input1.value.slice(7)}`;

      this.customLinksService.generateCustomLink(id, url).subscribe(
        (response) => {
          navigator.clipboard.writeText(url);
          alert('Sucesso: Link copiado para a área de transferência.');
        },
        (error) => {
          alert('Erro: Não foi possível gerar o link.');
        }
      );
    }
  }
}
