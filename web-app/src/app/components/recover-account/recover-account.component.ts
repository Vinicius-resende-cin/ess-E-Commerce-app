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

    requestReset(){
        const emailInput = document.getElementById(
            'input-email'
        )! as HTMLInputElement;

        const messageSpan = document.getElementById(
            'message-span'
          )! as HTMLSpanElement;
        
        const reqEmail = emailInput.value;
        
        if(reqEmail=="")
            return;

        messageSpan.classList.add('d-none');

        this.authService
        .requestReset(reqEmail)
        .subscribe((resp: any) => {
            console.log(resp);
            if(resp.success){
                messageSpan.classList.remove('d-none');
                messageSpan.textContent = this.Messages.REQUEST_SUCCESS;
            }
            else if(resp.triesExceeded){
                messageSpan.classList.remove('d-none');
                messageSpan.textContent = this.Messages.TOO_MANY_TRIES;
            }
            else if(!resp.registered){
                messageSpan.classList.remove('d-none');
                messageSpan.textContent = this.Messages.EMAIL_NOT_REG;
            }
        });
    }
}
