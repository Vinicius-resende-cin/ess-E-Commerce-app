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

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
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
      } else {
        alert('Senha informada está errada');
        this.delteUser(user);
      }
    });
  }
}
