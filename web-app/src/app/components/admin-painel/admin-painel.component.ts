import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../../common/usuario';

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

  delteUser(user: User): void {
    var confirmPassword;
    confirmPassword = prompt(
      `Tornar o usuário ${user.nomeCompleto} administrador?\nEmail: ${user.email}\nCPF: ${user.cpf}\n\nSenha:`
    );
    this.passorwdTest = confirmPassword;

    this.userservice.deleteUser(user, this.passorwdTest).subscribe((result) => {
      if (result.Sucess) {
        alert('Usuário Removido com sucesso');
        window.location.reload();
      } else {
        alert('Senha informada está errada');
      }
    });
  }

  changePermission(user: User): void {
    var confirmPassword;
    confirmPassword = prompt(
      `Tornar o usuário ${user.nomeCompleto} administrador?\nEmail: ${user.email}\nCPF: ${user.cpf}\n\nSenha:`
    );
    this.passorwdTest = confirmPassword;

    this.userservice
      .updateUserPermission(user, this.passorwdTest)
      .subscribe((result) => {
        if (result.Sucess) {
          alert('Usuário Teve a permissão alterada com sucesso');
          window.location.reload();
        } else {
          alert('Senha informada está errada');
        }
      });
  }
}
