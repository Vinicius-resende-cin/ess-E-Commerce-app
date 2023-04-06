import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Messages from '../../../../../common/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../common/login.scss'],
})

export class LoginComponent {
  emailInput!: HTMLInputElement;
  passwordInput!: HTMLInputElement;
  loginButton!: HTMLButtonElement;
  messageSpan!: HTMLSpanElement;
  passwordEye!: HTMLImageElement;

  imgEyeOn = new Image();
  imgEyeOff = new Image();

  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    this.emailInput = document.getElementById(
      'input-email'
    )! as HTMLInputElement;

    this.passwordInput = document.getElementById(
      'input-password'
    )! as HTMLInputElement;

    this.loginButton = document.getElementById(
      'login-button'
    )! as HTMLButtonElement;

    this.messageSpan = document.getElementById(
      'message-span'
    )! as HTMLSpanElement;

    this.passwordEye = document.getElementById(
      'password-eye'
    )! as HTMLImageElement;
  }

  //inicializa imagens
  ngOnInit(): void {
    this.imgEyeOn.src = '/assets/images/eye.svg';
    this.imgEyeOff.src = '/assets/images/eye-off.svg';
  }

  enableButton() {
    /**Reativa o botão de login*/
    const isButtonDisabled = this.emailInput.value == "" || this.passwordInput.value == "";
    this.loginButton.disabled = isButtonDisabled;
  }

  togglePassword() {
    /**Alterna entre mostrar e ocultar a senha */
    if (this.passwordInput.type === 'password') {
      this.passwordInput.type = 'text';
      this.passwordEye.src = this.imgEyeOff.src;
    }
    else {
      this.passwordInput.type = 'password';
      this.passwordEye.src = this.imgEyeOn.src;
    }
  }

  login() {
    /**Tenta realizar o login*/
    this.messageSpan.classList.add('d-none');

    try {
      this.authService
        .login(this.emailInput.value, this.passwordInput.value)
        .subscribe((resp: any) => {
          //tentativas excedidas
          if (resp.triesExceeded) {
            this.messageSpan.classList.remove('d-none');
            this.messageSpan.textContent = Messages.TOO_MANY_TRIES;
          }
          //sucesso
          else if (resp.success || resp.wasLogged) {
            this.router.navigate(['/home']);
          }
          //dados incorretos
          else if (resp.registered) {
            this.messageSpan.classList.remove('d-none');
            this.messageSpan.textContent = Messages.WRONG_LOGIN;
            this.passwordInput.value = '';
            this.loginButton.disabled = true;
          }
          //email nao registrado
          else if (!resp.registered) {
            this.messageSpan.classList.remove('d-none');
            this.messageSpan.textContent = Messages.EMAIL_NOT_REG;
          } else {
            this.messageSpan.classList.remove('d-none');
            this.messageSpan.textContent = Messages.UNKNOWN_ERROR;
          }
        });
    } catch {
      this.messageSpan.classList.remove('d-none');
      this.messageSpan.textContent = Messages.UNKNOWN_ERROR;
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
