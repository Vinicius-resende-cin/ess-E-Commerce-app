import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './recover-account.component.html',
    styleUrls: ['../../common/login.scss'],
})

export class RecoverAccountComponent {
    constructor(private authService: AuthService) {}

    Messages = {
        REQUEST_SUCCESS: 'Link de recuperação enviado ao seu email',
        TOO_MANY_TRIES: 'Limites de tentativas excedido. Tente mais tarde',
        EMAIL_NOT_REG: 'Email não cadastrado'
    };

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
                failedSpan.textContent = this.Messages.REQUEST_SUCCESS;
            }
            else if(resp.triesExceeded){
                failedSpan.classList.remove('d-none');
                failedSpan.textContent = this.Messages.TOO_MANY_TRIES;
            }
            else if(!resp.registered){
                failedSpan.classList.remove('d-none');
                failedSpan.textContent = this.Messages.EMAIL_NOT_REG;
            }
        });
    }

    checkSession(){
        //**Checa se o usuario ja esta logado*/
        this.authService
        .checkSession()
        .subscribe((resp: any) => {
            if(resp.loggedIn){
                window.location.href = './home';
            }
        
        });
    }
}
