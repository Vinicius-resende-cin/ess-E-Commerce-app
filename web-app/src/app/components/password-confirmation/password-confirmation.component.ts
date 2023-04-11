import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataSharingService } from 'src/app/services/datasharing.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.component.html',
  styleUrls: ['./password-confirmation.component.scss'],
})
export class PasswordConfirmationComponent {
  constructor(
    private authService: AuthService,
    private itemservice: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  imgEyeOn = new Image();
  imgEyeOff = new Image();
  id!: string | null;

  Messages = {
    WRONG_LOGIN: 'A senha está incorreta',
    TOO_MANY_TRIES: 'Número de tentativas excedido. Tente mais tarde',
    UNKNOWN_ERROR: 'Algo de errado ocorreu',
  };

  //inicializa imagens
  ngOnInit(): void {
    this.imgEyeOn.src = '/assets/images/eye.svg';
    this.imgEyeOff.src = '/assets/images/eye-off.svg';
    this.id = this.route.snapshot.paramMap.get('id');
  }

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
      passwordEye.src = this.imgEyeOff.src;
    } else {
      passwordInput.type = 'password';
      passwordEye.src = this.imgEyeOn.src;
    }
  }

  login() {
    /**Tenta realizar o login*/
    const loginButton = document.getElementById(
      'login-button'
    )! as HTMLButtonElement;

    const passwordInput = document.getElementById(
      'input-password'
    )! as HTMLInputElement;

    const messageSpan = document.getElementById(
      'message-span'
    )! as HTMLSpanElement;

    messageSpan.classList.add('d-none');
    // alert(passwordInput.value)
    try {
      this.authService
        .confirmPassword(passwordInput.value)
        .subscribe(async (resp: any) => {
          //tentativas excedidas
          if (resp.triesExceeded) {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.TOO_MANY_TRIES;
          }

          //sucesso
          else if (resp.success) {
            await new Promise((f) => {
              setTimeout(f, 500);
            });

            
            if (this.id) {
              this.deleteItem(this.id);
            }
          }

          //dados incorretos
          else if (resp.registered) {
            messageSpan.classList.remove('d-none');
            messageSpan.textContent = this.Messages.WRONG_LOGIN;
            passwordInput.value = '';
            loginButton.disabled = true;
          }
        });
    } catch {
      messageSpan.classList.remove('d-none');
      messageSpan.textContent = this.Messages.UNKNOWN_ERROR;
    }
  }

  deleteItem(id: string) {
    this.itemservice.deleteItem('/itens/' + id).subscribe(() => {
      this.router.navigate(['home', 'view-itens']);
    });
  }
}
