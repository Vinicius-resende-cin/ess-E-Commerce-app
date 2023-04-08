import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../../common/usuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-admin-painel',
  templateUrl: './admin-painel.component.html',
  styleUrls: ['./admin-painel.component.scss'],
})
export class AdminPainelComponent {
  listaUsers: User[] = [];
  passorwdTest: any = '';
  userLogged = this.criaUser();

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
      permissao: 0,
    };

    return user;
  }

  ngOnInit(): void {
    this.userservice.getCurrentUser().subscribe((result) => {
      this.userLogged = result[0];
      console.log(this.userLogged.nomeCompleto);
    });

    this.userservice.gelAllUsers().subscribe((result) => {
      this.listaUsers = result;
      console.log(this.listaUsers);
    });
  }

  alertError(msg: string){
    const error = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    
    error.fire({
      icon: 'error',
      title: msg
    })
  };

  alertAcept(msg: string){
    const sucess = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
    
    sucess.fire({
      icon: 'success',
      title: msg
    })
    window.location.reload();
  };

  

  async delteUser(user: User) {

    const { value: formValues }  = await Swal.fire({
      title: `Deletar o Usuário ${user.nomeCompleto}?\nEmail: ${user.email}\nCPF: ${user.cpf}`,
      html:
        '<label>Senha do Admin</label><input id="swal-input1" class="swal2-input" type="password">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const val1 = (document.getElementById(
          'swal-input1'
        ) as HTMLInputElement).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
        ];
      }
    });
    
    this.passorwdTest = formValues;

  
    this.userservice.deleteUser(user, this.passorwdTest[0]).subscribe((result) => {
      if (result.Sucess) {
        this.alertAcept('Usuário Removido com sucesso');
        
      } else {
        this.alertError('Senha informada está errada');
      }
    });  
  }

  async changePermission(user: User) {
    const { value: formValues }  = await Swal.fire({
      title: `Trocar a permissão do ${user.nomeCompleto}?\nEmail: ${user.email}\nCPF: ${user.cpf}`,
      html:
        '<label>Senha do Admin</label><input id="swal-input1" class="swal2-input" type="password">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const val1 = (document.getElementById(
          'swal-input1'
        ) as HTMLInputElement).value;
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
        ];
      }
    });

    this.passorwdTest = formValues;

    this.userservice
      .updateUserPermission(user, this.passorwdTest)
      .subscribe((result) => {
        if (result.Sucess) {
          this.alertAcept('Usuário Teve a permissão alterada com sucesso');
        } else {
          this.alertError('Senha informada está errada');
        }
      });
  }
}
