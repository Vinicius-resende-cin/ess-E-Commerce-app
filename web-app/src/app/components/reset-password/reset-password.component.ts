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
        NOT_ENOUGH_CHARS: 'A senha precisa ter pelo menos 10 caracteres',
        TOO_MANY_TRIES: 'Número de tentativas excedido. Tente mais tarde',
        EXPIRED_LINK: 'Link expirado',
        UNKNOWN_ERROR: 'Algo de errado ocorreu'
    };

    Images = {
        EYE_OFF: '/assets/images/eye-off.svg',
        EYE_ON: '/assets/images/eye.svg'
    };

    ngOnInit(): void {
        this.checkSession();
    }

    enableButton(){
        const resetButton = document.getElementById(
            'reset-button'
        )! as HTMLInputElement;

        resetButton.disabled = false;
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
            passwordEye.src = this.Images.EYE_OFF;
        } else {
            passwordInput.type = 'password';
            passwordEye.src = this.Images.EYE_ON;
            
        }
    }

    resetPassword(){
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{10,})/;
        const lengthRegex = /^.{10,}$/;
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

        const failedSpan = document.getElementById(
            'failed-message'
        )! as HTMLInputElement;
        
        //esconde a mensagem de erro
        failedSpan.classList.add("d-none");

        const urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');
        token = token == null ? '' : token;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;

        //compara as senhas
        if(password != passwordRepeat){
            failedSpan.textContent = this.Messages.DIFF_PASSWORDS;
            failedSpan.classList.remove("d-none");

            return;
        }

        //checa se a senha atende as regras
        if(!passwordRegex.test(password)){
            if (!specialCharRegex.test(password)) {
                failedSpan.textContent = this.Messages.NO_SPECIAL;
            }
            
            if (!letterRegex.test(password)) {
                failedSpan.textContent = this.Messages.NO_LETTERS;
            }
            
            if (!lengthRegex.test(password)) {
                failedSpan.textContent = this.Messages.NOT_ENOUGH_CHARS;
            }

            failedSpan.classList.remove("d-none");
            return;
        }

        try{
            this.authService
            .changePassword(password, token)
            .subscribe((resp: any) => {
                if(resp.success){
                    failedSpan.textContent = this.Messages.CHANGE_SUCCESS;
                    failedSpan.classList.remove("d-none");
                    resetButton.disabled = true;
                    
                    setTimeout(function(){
                        window.location.href = '/login';
                    }, 3000); //3 segundos
                }
                else if(resp.triesExceeded){
                    failedSpan.textContent = this.Messages.TOO_MANY_TRIES;
                    failedSpan.classList.remove("d-none");
                }
                else if(!resp.validToken){
                    failedSpan.textContent = this.Messages.EXPIRED_LINK;
                    failedSpan.classList.remove("d-none");
                    resetButton.disabled = true;

                    setTimeout(function(){
                        window.location.href = '/';
                    }, 3000); //3 segundos
                    
                }
                else{
                    failedSpan.textContent = this.Messages.UNKNOWN_ERROR;
                    failedSpan.classList.remove("d-none");
                }
            });
        }
        catch{
            failedSpan.textContent = this.Messages.UNKNOWN_ERROR;
            failedSpan.classList.remove("d-none");
        }
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
