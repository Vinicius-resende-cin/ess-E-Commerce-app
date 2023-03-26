import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})

export class ResetPassword {
    constructor(private authService: AuthService) {}

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
        const togglePasswordBtn = event.target as HTMLButtonElement;

        var passwordInput;
        if(togglePasswordBtn.parentElement!=null){
            passwordInput = togglePasswordBtn.parentElement.getElementsByTagName("input")[0] as HTMLInputElement;

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePasswordBtn.textContent = "Esconder Senha";
            } else {
                passwordInput.type = "password";
                togglePasswordBtn.textContent = "Mostrar Senha";
            }
        }
    }

    resetPassword(){
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

        failedSpan.classList.add("d-none");

        const urlParams = new URLSearchParams(window.location.search);
        var token = urlParams.get('token');
        token = token == null ? '' : token;
        const password = passwordInput.value;
        const passwordRepeat = passwordRepeatInput.value;

        if(password != passwordRepeat){
            failedSpan.textContent = 'As senhas não são iguais';
            failedSpan.classList.remove("d-none");

            return;
        }

        try{
            this.authService
            .changePassword(password, token)
            .subscribe((resp: any) => {
                console.log(resp);
                if(resp.success){
                    alert('Senha alterada com sucesso');
                    window.location.href = 'http://localhost:4200/';
                }
                else if(resp.triesExceeded){
                    alert('Número de tentativas excedido, tente mais tarde');
                }
                else if(!resp.validToken){
                    alert('Link expirado');
                    window.location.href = 'http://localhost:4200/';
                }
                else{
                    alert('Algum erro ocorreu');
                }
            });
        }
        catch{
            console.log('uhh');
        }
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
