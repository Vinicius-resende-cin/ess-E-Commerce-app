import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './recover-account.component.html',
    styleUrls: ['./recover-account.component.scss'],
})

export class RecoverPassword {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.checkSession();
    }

    requestReset(){
        const emailInput = document.getElementById(
            'input-email'
        )! as HTMLInputElement;

        const failedSpan = document.getElementById(
            'failed-message'
          )! as HTMLSpanElement;
        
        const reqEmail = emailInput.value;
        
        if(reqEmail=="")
            return;

        failedSpan.classList.add('d-none');

        this.authService
        .requestReset(reqEmail)
        .subscribe((resp: any) => {
            console.log(resp);
            if(resp.success){
                failedSpan.classList.remove('d-none');
                failedSpan.textContent = 'Link de recuperação enviado ao seu email';
            }
            else if(resp.triesExceeded){
                failedSpan.classList.remove('d-none');
                failedSpan.textContent = 'Limites de tentativas excedido. Tente mais tarde';
            }
            else if(!resp.registered){
                failedSpan.classList.remove('d-none');
                failedSpan.textContent = 'Email não cadastrado';
            }
        });
    }

    checkSession(){
        //**Checa se o usuario ja esta logado*/
        this.authService
        .checkSession()
        .subscribe((resp: any) => {
            if(resp.loggedIn){
                window.location.href = 'http://localhost:4200/';
            }
        
        });
    }
}
