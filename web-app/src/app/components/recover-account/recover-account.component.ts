import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Messages from '../../../../../common/messages';

@Component({
    selector: 'app-login',
    templateUrl: './recover-account.component.html',
    styleUrls: ['../../common/login.scss'],
})

export class RecoverAccountComponent {
    emailInput!: HTMLInputElement;
    requestButton!: HTMLButtonElement;
    messageSpan!: HTMLSpanElement;

    constructor(private authService: AuthService) {}

    ngAfterViewInit(){
        this.emailInput = document.getElementById(
            'input-email'
        )! as HTMLInputElement;
    
        this.requestButton = document.getElementById(
            'request-button'
        )! as HTMLButtonElement;

        this.messageSpan = document.getElementById(
            'message-span'
        )! as HTMLSpanElement;
    }

    enableButton() {
        const isButtonDisabled = this.emailInput.value == "";
        this.requestButton.disabled = isButtonDisabled;
      }

    requestReset(){
        const reqEmail = this.emailInput.value;
        
        if(reqEmail=="")
            return;

        this.messageSpan.classList.add('d-none');

        this.authService
        .requestReset(reqEmail)
        .subscribe((resp: any) => {
            this.requestButton.disabled = true;
            if(resp.success){
                this.messageSpan.classList.remove('d-none');
                this.messageSpan.textContent = Messages.REQUEST_SUCCESS;
            }
            else if(resp.triesExceeded){
                this.messageSpan.classList.remove('d-none');
                this.messageSpan.textContent = Messages.TOO_MANY_TRIES;
            }
            else if(!resp.registered){
                this.messageSpan.classList.remove('d-none');
                this.messageSpan.textContent = Messages.EMAIL_NOT_REG;
            }
            else{
                this.messageSpan.classList.remove('d-none');
                this.messageSpan.textContent = Messages.UNKNOWN_ERROR;
            }
        });
    }
}
