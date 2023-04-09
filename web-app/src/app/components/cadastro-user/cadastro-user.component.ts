import { Component } from '@angular/core';
import { User } from '../../../../../common/usuario';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

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

  alertError(msg: string, msgInfo: string){
    Swal.fire({
      icon: 'error',
      title: msg,
      text: msgInfo
    })
  };

  async alertAccept(msg: string, msgInfo: string){
    await Swal.fire({
      icon: 'success',
      title: msg,
      text: msgInfo
    })

    this.router.navigate(['/login']);
  };

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
          this.alertAccept('Usuário Cadastrado no Sistema', '');
          
    
        } else if(result.CPF){
          this.alertError('CPF inválido', 'O CPF a ser cadastrado já existe no sistema');
          this.user.cpf = '';

        } else if(result.EMAIL){
          this.alertError('E-mail inválido', 'O E-mail a ser cadastrado já existe no sistema');
          this.user.email = '';
          this.user.emailC = '';

        }else{
          this.alertError('Houve um erro inesperado, tente novamente', '');
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
      this.alertError('Há campos vazios no cadastro', '');

    } else if (this.passwordSize && !this.passwordDiff) {
      this.alertError('Senha Inválida', 'As senhas inseridas não são iguais');
      this.user.senha = '';
      this.user.senhaC = '';

    } else if (!this.passwordSize && this.passwordDiff) {
      this.alertError('Senha Inválida', 'As senhas informadas não segue as regras de possui 8 caracters, sendo 1 letra e 1 caractere especial');
      this.user.senha = '';
      this.user.senhaC = '';

    } else {
      this.alertError('Senha Inválida', 'A senha informada não possui 8 caracteres nem é igual a de confirmação');
      this.user.senha = '';
      this.user.senhaC = '';
      
    }
  }
}
