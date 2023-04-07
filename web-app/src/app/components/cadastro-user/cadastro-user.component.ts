import { Component } from '@angular/core';
import { User } from '../../../../../common/usuario';
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
  passwordChar: boolean = false;
  passwordEspecial: boolean = false;
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
      permissao: 0
    };

    return user;
  }

  verificaSenha() {

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{8,})/;
    const lengthRegex = /^.{8,}$/;
    const letterRegex = /[a-zA-Z]/;
    const specialCharRegex = /[\W_]/;

    let password: string = this.user.senha.toString();

    if (this.user.senha == this.user.senhaC && lengthRegex.test(password)) {
      this.passwordDiff = true;
    } else {
      this.passwordDiff = false;
    }

    if (lengthRegex.test(password)) {
      this.passwordSize = true;
    }  
    else{
      this.passwordSize = false;
    }
    if(letterRegex.test(password)) {
      this.passwordChar = true;
    }
    else{
      this.passwordChar = false;
    }
    if(specialCharRegex.test(password)){
      this.passwordEspecial = true;
    }
    else{
      this.passwordEspecial = false;
    }
  }


  enviaUser(){
    if (this.passwordSize && this.passwordDiff) {
      this.userservice.createUser(this.user).subscribe((result) => {
        if (result.success) {
          this.user = this.criaUser();
          console.log(result);
          this.router.navigate(['/login']);
        } else if(result.CPF){
          alert("O CPF a ser cadastrado já existe no sistema");
          this.user.cpf = '';
        } else if(result.EMAIL){
          alert('O E-mail a ser cadastrado já existe no sistema');
          this.user.email = '';
          this.user.emailC = '';
        }else{
          alert('Houve um erro inesperado, tente novamente')
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
      alert('As senhas informadas não segue as regras de possui 8 caracters, sendo 1 letra e 1 caractere especial');
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
