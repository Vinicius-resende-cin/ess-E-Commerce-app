import { Component } from '@angular/core';
import { User } from '../../../../../common/usuario';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent {

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

  constructor(
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe((result) => {
      this.userLogged = result[0];
      console.log(this.userLogged.nomeCompleto);
    });
  }
}
