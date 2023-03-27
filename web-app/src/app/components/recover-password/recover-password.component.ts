import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss'],
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
        
        const reqEmail = emailInput.value;
        this.authService
        .requestReset(reqEmail)
        .subscribe((resp: any) => {
            console.log(resp);
            if(resp.success){
                alert('O link de recuperação enviado ao seu email e expira em 10 minutos');
            }
            else if(resp.triesExceeded){
                alert('Limites de tentativas alcançado, tenta mais tarde');
            }
            else if(!resp.registered){
                alert('Email não cadastrado');
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
