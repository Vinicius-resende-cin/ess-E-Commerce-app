import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private authService: AuthService) {}
  
  logout(){
    /**Desloga o usuario*/
    this.authService
    .logout()
    .subscribe((resp: any) => {
        if(resp.success){
            window.location.href = 'http://localhost:4200/login';
        }
    });
  }
}
