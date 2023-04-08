import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss']
})
export class GenerateLinkComponent {
  showModal = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.showModal = !this.showModal;
  }

  copyToClipboard(inputElement: HTMLInputElement) {
    inputElement.select();
    navigator.clipboard.writeText(inputElement.value);
    alert('Link copiado para a área de transferência.');
  }
}
