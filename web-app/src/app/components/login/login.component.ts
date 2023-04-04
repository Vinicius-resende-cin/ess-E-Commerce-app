import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common/login.scss'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  Messages = {
    ALREADY_LOGGED: 'Você já estava logado',
    EMAIL_NOT_REG: 'Email não cadastrado',
    WRONG_LOGIN: 'Email e senha não correspondem',
    TOO_MANY_TRIES: 'Número de tentativas excedido. Tente mais tarde',
    UNKNOWN_ERROR: 'Algo de errado ocorreu',
  };

  Images = {
    EYE_OFF: '/assets/images/eye-off.svg',
    EYE_ON: '/assets/images/eye.svg',
  };

  enableButton() {
    /**Reativa o botão de login*/
    const loginButton = document.getElementById(
      'login-button'
    )! as HTMLInputElement;

    loginButton.disabled = false;
  }

  togglePassword() {
    /**Alterna entre mostrar e ocultar a senha */
    const passwordInput = document.getElementById(
      'input-password'
    )! as HTMLInputElement;

    const passwordEye = document.getElementById(
      'password-eye'
    )! as HTMLInputElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      passwordEye.src = this.Images.EYE_OFF;
    } else {
      passwordInput.type = 'password';
      passwordEye.src = this.Images.EYE_ON;
    }
  }

  login() {
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

    const messageSpan = document.getElementById(
      'message-span'
    )! as HTMLSpanElement;

    messageSpan.classList.add('d-none');
    try {
      this.authService
        .login(emailInput.value, passwordInput.value)
        .subscribe((resp: any) => {
          //tentativas excedidas
          if (resp.triesExceeded) {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.TOO_MANY_TRIES;
          }
          //sucesso
          else if (resp.success || resp.wasLogged) {
            this.router.navigate(['/home']);
          }
          //dados incorretos
          else if (resp.registered) {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.WRONG_LOGIN;
            passwordInput.value = '';
            loginButton.disabled = true;
          }
          //email nao registrado
          else if (!resp.registered) {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.EMAIL_NOT_REG;
          } else {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.UNKNOWN_ERROR;
          }
        });
    } catch {
      messageSpan.classList.remove('d-none');
      messageSpan.textContent = this.Messages.UNKNOWN_ERROR;
    }
  }

  logout() {
    /**Desloga o usuario*/
    this.authService.logout().subscribe((resp: any) => {
      if (resp.success) {
        this.router.navigate(['/login']);
      }
    });
  }
}
