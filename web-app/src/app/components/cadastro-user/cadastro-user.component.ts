import { Component } from '@angular/core';
import { User } from '../../../../../commom/usuario';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.scss'],
})
export class CadastroUserComponent {
  passwordSize: boolean = false;
  passwordDiff: boolean = false;
  cpfDuplicado: boolean = false;
  user = this.criaUser();

  constructor(private userservice: UserService, private router: Router) {}

  criaUser(): User {
    let user: User = {
      nomeCompleto: '',
      cpf: '',
      celular: '',
      dataNasci: '',
      email: '',
      emailC: '',
      senha: '',
      senhaC: '',
      endereco: '',
      complemento: '',
      cep: '',
      estado: '',
      cidade: '',
    };

    return user;
  }

  verificaSenha() {
    if (this.user.senha == this.user.senhaC) {
      this.passwordDiff = true;
    } else {
      this.passwordDiff = false;
    }

    if (this.user.senha.length >= 8) {
      this.passwordSize = true;
    } else if (this.user.senha == '') {
      this.passwordSize = false;
    } else {
      this.passwordSize = false;
    }
  }

  enviaUser() {
    if (this.passwordSize && this.passwordDiff) {
      this.userservice.createUser(this.user).subscribe((result) => {
        if (result.success) {
          this.user = this.criaUser();
          console.log(result);
          this.router.navigate(['/login']);
        } else {
          this.cpfDuplicado = true;
          alert('CPF ou email Duplicado');
          this.user.email = '';
          this.user.emailC = '';
          this.user.cpf = '';
        }
      });
    } else if (
      this.user.nomeCompleto == '' ||
      this.user.cpf == '' ||
      this.user.celular == '' ||
      this.user.dataNasci == '' ||
      this.user.email == '' ||
      this.user.emailC == '' ||
      this.user.senha == '' ||
      this.user.senhaC == '' ||
      this.user.endereco == '' ||
      this.user.complemento == '' ||
      this.user.cep == '' ||
      this.user.estado == '' ||
      this.user.cidade == ''
    ) {
      alert('Há campos vazios no cadastro');
    } else if (this.passwordSize && !this.passwordDiff) {
      alert('As senhas informadas não são iguais');
      this.user.senha = '';
      this.user.senhaC = '';
    } else if (!this.passwordSize && this.passwordDiff) {
      alert('As senhas informadas não possuem 8 caracteres');
      this.user.senha = '';
      this.user.senhaC = '';
    } else {
      alert(
        'A senha informada não possui 8 caracteres nem é igual a de confirmação'
      );
      this.user.senha = '';
      this.user.senhaC = '';
    }
  }
}
