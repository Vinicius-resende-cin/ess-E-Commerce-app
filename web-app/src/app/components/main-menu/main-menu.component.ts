import { Component } from '@angular/core';
import * as Names from '../../common/global-names';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent {
  title = Names.appTitle;
  isLoggedIn = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkSession();

    document.querySelector(".hamburger")?.addEventListener("click", () => {
      document.querySelector(".option")?.classList.toggle("show-menu");
      document.querySelector(".sidebar")?.classList.toggle("show-menu");
    });
  }

  goHome() {
    window.location.href = 'http://localhost:4200/';
  }

  logout() {
    /**Desloga o usuario*/
    this.authService.logout().subscribe((resp: any) => {
      if (resp.success) {
        window.location.href = 'http://localhost:4200/';
      }
    });
  }

  checkSession() {
    //**Checa se o usuario ja esta logado*/
    this.authService.checkSession().subscribe((resp: any) => {
      this.isLoggedIn = resp.loggedIn;
    });
  }
}
