import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './reset-password.component.html',
    styleUrls: ['../../common/login.scss'],
})

export class ResetPasswordComponent {
    constructor(private authService: AuthService) {}

    Messages = {
        CHANGE_SUCCESS: 'Senha alterada com sucesso',
        DIFF_PASSWORDS: 'As senhas não são iguais',
        NO_SPECIAL: 'A senha precisa ter pelo menos um caractere especial',
        NO_LETTERS: 'A senha precisa ter pelo menos uma letra',
        NOT_ENOUGH_CHARS: 'A senha precisa ter pelo menos 8 caracteres',
        TOO_MANY_TRIES: 'Número de tentativas excedido. Tente mais tarde',
        EXPIRED_LINK: 'Link expirado',
        UNKNOWN_ERROR: 'Algo de errado ocorreu'
    };

    imgEyeOn = new Image();
    imgEyeOff = new Image();

    //inicializa imagens
    ngOnInit(): void {
        this.imgEyeOn.src = '/assets/images/eye.svg';
        this.imgEyeOff.src = '/assets/images/eye-off.svg';
    }

    enableButton(){
        const resetButton = document.getElementById(
            'reset-button'
        )! as HTMLInputElement;

        const passwordInput = document.getElementById(
            'input-password'
          )! as HTMLInputElement;
      
        const passwordRepeatInput = document.getElementById(
            'input-password-repeat'
        )! as HTMLInputElement;
          
          const isButtonDisabled = passwordRepeatInput.value == "" || passwordInput.value == "";
          resetButton.disabled = isButtonDisabled;
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
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{8,})/;
        const lengthRegex = /^.{8,}$/;
        const letterRegex = /[a-zA-Z]/;
        const specialCharRegex = /[\W_]/;

        /**Altera a senha do usuario*/
        const resetButton = document.getElementById(
            'reset-button'
        )! as HTMLInputElement;

        const passwordInput = document.getElementById(
            'input-password'
        )! as HTMLInputElement;

        const passwordRepeatInput = document.getElementById(
            'input-password-repeat'
        )! as HTMLInputElement;

        const messageSpan = document.getElementById(
            'message-span'
        )! as HTMLInputElement;
        
        //esconde a mensagem de erro
        messageSpan.classList.add("d-none");

        const urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');
        token = token == null ? '' : token;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;

        //compara as senhas
        if(password != passwordRepeat){
            messageSpan.textContent = this.Messages.DIFF_PASSWORDS;
            messageSpan.classList.remove("d-none");

            return;
        }

        //checa se a senha atende as regras
        if(!passwordRegex.test(password)){
            if (!specialCharRegex.test(password)) {
                messageSpan.textContent = this.Messages.NO_SPECIAL;
            }
            
            if (!letterRegex.test(password)) {
                messageSpan.textContent = this.Messages.NO_LETTERS;
            }
            
            if (!lengthRegex.test(password)) {
                messageSpan.textContent = this.Messages.NOT_ENOUGH_CHARS;
            }

            messageSpan.classList.remove("d-none");
            return;
        }

        try{
            this.authService
            .changePassword(password, token)
            .subscribe((resp: any) => {
                if(resp.success){
                    messageSpan.classList.remove("d-none");
                    messageSpan.textContent = this.Messages.CHANGE_SUCCESS;
                    resetButton.disabled = true;
                    
                }
                else if(resp.triesExceeded){
                    messageSpan.classList.remove("d-none");
                    messageSpan.textContent = this.Messages.TOO_MANY_TRIES;
                }
                else if(!resp.validToken){
                    messageSpan.classList.remove("d-none");
                    messageSpan.textContent = this.Messages.EXPIRED_LINK;
                    resetButton.disabled = true;
                }
                else{
                    messageSpan.classList.remove("d-none");
                    messageSpan.textContent = this.Messages.UNKNOWN_ERROR;
                }
            });
        }
        catch{
            messageSpan.textContent = this.Messages.UNKNOWN_ERROR;
            messageSpan.classList.remove("d-none");
        }
    }
}
