import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string;
  show = true;

  constructor(private router: Router) {
    this.message = "";
  }

  /* Retorna para a página de categorias */
  close(): void {
    this.show = false;
    this.router.navigate(['home', 'categoria']);
  }
}
