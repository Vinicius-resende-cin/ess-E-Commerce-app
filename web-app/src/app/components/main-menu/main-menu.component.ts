import { Component } from '@angular/core';
import * as Names from '../../common/global-names';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  title = Names.appTitle;
  isLoggedIn = false;

  constructor() {}

  goHome() {
    window.location.href = 'http://localhost:4200/';
  }
}
