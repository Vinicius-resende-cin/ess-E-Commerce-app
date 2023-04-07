import { Component, Input } from '@angular/core';

import { CategoryCreationComponent } from '../category-creation/category-creation.component';
import { CategoryUpdateComponent } from '../category-update/category-update.component';

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

  close(): void {
    this.show = false;
    this.router.navigate(['home', 'categoria']);
  }

  get_show(): boolean {
    return this.show;
  }
}
