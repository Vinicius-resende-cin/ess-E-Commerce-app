import { Component } from '@angular/core';
import { User } from '../../../../../common/usuario';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss'],
})
export class PerfilUserComponent {
  passValues: any;
  passwordTest: any;

  userLogged: User = {
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
    permissao: 0,
  };

  constructor(private userservice: UserService, private router: Router) {}

  //Método que pega as informações do usuário logado
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe((result) => {
      this.userLogged = result[0];
    });
  }

  //Método que cria o alert de Erro
  alertError(msg: string) {
    const error = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    error.fire({
      icon: 'error',
      title: msg,
    });
  }

  //Método que cria o alert de Sucesso
  alertAcept(msg: string) {
    const sucess = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    sucess.fire({
      icon: 'success',
      title: msg,
    });
  }

  //Método que cria o alert para o recebimento da nova senha
  async recivePassword() {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.{8,})/;

    const { value: formValues } = await Swal.fire({
      title: 'Troca de Senha',
      html:
        '<label>Senha Atual</label><input id="swal-input1" class="swal2-input" type="password" name="Senha-Atual">' +
        '<label>Nova Senha</label><input id="swal-input2" class="swal2-input" type="password" name="Nova-Senha">' +
        '<label>Confirmação</label><input id="swal-input3" class="swal2-input" type="password" name="Confirmar-Senha">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const val1 = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
        ];
      },
    });

    //Verificação se a senha segue as regras de negócio
    this.passValues = formValues;
    if (
      this.passValues[0] != '' &&
      this.passValues[1] != '' &&
      this.passValues[2] != ''
    ) {
      if (this.passValues[1] == this.passValues[2]) {
        if (passwordRegex.test(this.passValues[1])) {
          this.changePasword();
        } else {
          this.alertError(
            'A nova senha não segue as regras para criação de senha'
          );
        }
      } else {
        this.alertError(
          'Os campos Nova senha e confirmação de senha não são iguais'
        );
      }
    } else {
      this.alertError('Restaram campos em branco');
    }
  }

  //Método que cria o alert para o do novo endereço
  async reciveAdrress() {
    const { value: formValues } = await Swal.fire({
      title: 'Troca de Endereço',
      html:
        '<label>Endereço</label><input id="swal-input1" class="swal2-input" type="text" name="endereco">  <br>' +
        '<label>Complemento</label><input id="swal-input2" class="swal2-input" type="text" name="Complemento">  <br>' +
        '<label>CEP</label><input id="swal-input3" class="swal2-input" type="text" name="CEP">  <br>' +
        '<label>Cidade</label><input id="swal-input4" class="swal2-input" type="text" name="cidade">  <br>' +
        '<label>Estado</label><input id="swal-input5" class="swal2-input" type="text" name="estado">  <br>',
      focusConfirm: false,
      showCancelButton: true,
      width: '35%',
      preConfirm: () => {
        const val1 = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
          (document.getElementById('swal-input4') as HTMLInputElement).value,
          (document.getElementById('swal-input5') as HTMLInputElement).value,
        ];
      },
    });

    this.passValues = formValues;
    if (
      this.passValues[0] != '' &&
      this.passValues[1] != '' &&
      this.passValues[2] != '' &&
      this.passValues[3] != '' &&
      this.passValues[4] != ''
    ) {
      this.changeAddress();
    } else {
      this.alertError('Restaram campos em branco');
    }
  }

  //Método que faz a requisição para trocar a senha do usuário
  changePasword() {
    this.userservice
      .updatePassword(this.userLogged, this.passValues)
      .subscribe((result) => {
        if (result.Sucess) {
          this.alertAcept('Senha foi alterada com sucesso');
        } else {
          this.alertError(result.failure);
        }
      });
  }

  //Método que faz a requisição para trocar o endereço do usuário
  async changeAddress() {
    const { value: formValues } = await Swal.fire({
      title: 'Troca de Endereço',
      html: '<label>Senha Atual</label><input id="swal-input1" class="swal2-input" type="password" name="senha-atual">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const val1 = (
          document.getElementById('swal-input1') as HTMLInputElement
        ).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
        ];
      },
    });

    this.passwordTest = formValues;
    console.log(this.passwordTest[0]);

    this.userservice
      .updateAddress(this.userLogged, this.passValues, this.passwordTest)
      .subscribe((result) => {
        if (result.Sucess) {
          this.alertAcept(
            'As informações do endereço foi alterada com sucesso'
          );
        } else {
          this.alertError(result.failure);
        }
      });
  }
}
