import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.checkSession();
    }

    enableButton(){
        const loginButton = document.getElementById(
            'login-button'
        )! as HTMLInputElement;

        loginButton.disabled = false;
    }

    togglePassword(){
        /**Alterna entre mostrar e ocultar a senha */
        const passwordInput = document.getElementById(
            'input-password'
        )! as HTMLInputElement;

        const togglePasswordBtn = document.getElementById(
            'toggle-password'
        )! as HTMLInputElement;

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.textContent = "Esconder Senha";
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.textContent = "Mostrar Senha";
        }
    }

    login(){
        /**Tenta realizar o login*/
        const loginButton = document.getElementById(
            'login-button'
        )! as HTMLButtonElement;

        const emailInput = document.getElementById(
            'input-email'
        )! as HTMLInputElement;

        const passwordInput = document.getElementById(
            'input-password'
        )! as HTMLInputElement;

        const failedSpan = document.getElementById(
            'failed-message'
        )! as HTMLSpanElement;

        failedSpan.classList.add("d-none");
        try{
        this.authService
        .login(emailInput.value, passwordInput.value)
        .subscribe((resp: any) => {
            if(resp.triesExceeded){
                failedSpan.classList.remove("d-none");
                failedSpan.textContent = resp.message;
            }
            else if(resp.success || resp.wasLogged){
                window.location.href = 'http://localhost:4200/';
            }
            else if(resp.registered){
                failedSpan.classList.remove("d-none");
                failedSpan.textContent = resp.message;
                passwordInput.value = '';
                loginButton.disabled = true;
            }
            else{
                failedSpan.classList.remove("d-none");
                failedSpan.textContent = resp.message;
            }
            
        });
        }
        catch{
            console.log('uhh');
        }
    }

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
