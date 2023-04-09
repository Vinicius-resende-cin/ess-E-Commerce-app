import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Messages from '../../../../../common/messages';

@Component({
    selector: 'app-login',
    templateUrl: './reset-password.component.html',
    styleUrls: ['../../common/login.scss'],
})

export class ResetPasswordComponent {
    passwordInput!: HTMLInputElement;
    passwordRepeatInput!: HTMLInputElement;
    resetButton!: HTMLButtonElement;
    messageSpan!: HTMLSpanElement;

    imgEyeOn = new Image();
    imgEyeOff = new Image();

    constructor(private authService: AuthService) {}

    ngAfterViewInit(){
        this.passwordInput = document.getElementById(
            'input-password'
          )! as HTMLInputElement;
      
        this.passwordRepeatInput = document.getElementById(
            'input-password-repeat'
        )! as HTMLInputElement;

        this.resetButton = document.getElementById(
            'reset-button'
        )! as HTMLButtonElement;

        this.messageSpan = document.getElementById(
            'message-span'
        )! as HTMLSpanElement;
    }

    //inicializa imagens
    ngOnInit(): void {
        this.imgEyeOn.src = '/assets/images/eye.svg';
        this.imgEyeOff.src = '/assets/images/eye-off.svg';
    }

    enableButton(){
        const isButtonDisabled = this.passwordRepeatInput.value == "" || this.passwordInput.value == "";
        this.resetButton.disabled = isButtonDisabled;
    }

    togglePassword(event: MouseEvent){
        /**Alterna entre mostrar e ocultar a senha */
        const passwordEye = event.target as HTMLImageElement;

        const togglePasswordBtn = passwordEye.parentElement as HTMLButtonElement;

        var passwordInput;
        passwordInput = togglePasswordBtn.parentElement!
        .getElementsByTagName("input")[0] as HTMLInputElement;
    
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordEye.src = this.imgEyeOff.src;
        } else {
            passwordInput.type = 'password';
            passwordEye.src = this.imgEyeOn.src;
            
        }
    }

    resetPassword(){
        /**Altera a senha do usuario*/

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{8,})/;
        const lengthRegex = /^.{8,}$/;
        const letterRegex = /[a-zA-Z]/;
        const specialCharRegex = /[\W_]/;

        //esconde a mensagem de erro
        this.messageSpan.classList.add("d-none");

        const urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');
        token = token == null ? '' : token;
        const password = this.passwordInput.value;
        const passwordRepeat = this.passwordRepeatInput.value;

        //compara as senhas
        if(password != passwordRepeat){
            this.messageSpan.textContent = Messages.DIFF_PASSWORDS;
            this.messageSpan.classList.remove("d-none");

            return;
        }

        //checa se a senha atende as regras
        if(!passwordRegex.test(password)){
            if (!specialCharRegex.test(password)) {
                this.messageSpan.textContent = Messages.NO_SPECIAL;
            }
            
            if (!letterRegex.test(password)) {
                this.messageSpan.textContent = Messages.NO_LETTERS;
            }
            
            if (!lengthRegex.test(password)) {
                this.messageSpan.textContent = Messages.NOT_ENOUGH_CHARS;
            }

            this.messageSpan.classList.remove("d-none");
            return;
        }

        try{
            this.authService
            .changePassword(password, token)
            .subscribe((resp: any) => {
                if(resp.success){
                    this.messageSpan.classList.remove("d-none");
                    this.messageSpan.textContent = Messages.CHANGE_SUCCESS;
                    this.resetButton.disabled = true;
                    
                }
                else if(resp.triesExceeded){
                    this.messageSpan.classList.remove("d-none");
                    this.messageSpan.textContent = Messages.TOO_MANY_TRIES;
                }
                else if(!resp.validToken){
                    this.messageSpan.classList.remove("d-none");
                    this.messageSpan.textContent = Messages.EXPIRED_LINK;
                    this.resetButton.disabled = true;
                }
                else{
                    this.messageSpan.classList.remove("d-none");
                    this.messageSpan.textContent = Messages.UNKNOWN_ERROR;
                }
            });
        }
        catch{
            this.messageSpan.textContent = Messages.UNKNOWN_ERROR;
            this.messageSpan.classList.remove("d-none");
        }
    }
}
