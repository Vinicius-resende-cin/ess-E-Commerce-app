import { Component, Input } from '@angular/core';

import { CategoryCreationComponent } from '../category-creation/category-creation.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() message: string;
  show = true;

  /*
  constructor(private categoryCreation: CategoryCreationComponent) {
    this.message = "";
  }

    close(): void {
    this.show = false;
    this.categoryCreation.clearErros();
    this.categoryCreation.sairDaCriacao();
  }
  */


  constructor(private categoryUpdate: CategoryUpdateComponent) {
    this.message = "";
  }

  close(): void {
    this.show = false;
    this.categoryUpdate.clearErros();
    this.categoryUpdate.sairDaCriacao();
  }


  get_show(): boolean {
    return this.show;
  }
}
