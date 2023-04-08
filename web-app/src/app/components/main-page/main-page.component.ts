import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../../common/usuario';
import { Itens } from 'src/app/common/global-types';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
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
    private authService: AuthService,
    private userservice: UserService,
    private itemservice: ItemService
  ) {}

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe((result) => {
      this.userLogged = result[0];
      console.log(this.userLogged.nomeCompleto);
    });
  }

  logout() {
    /**Desloga o usuario*/
    this.authService.logout().subscribe((resp: any) => {
      if (resp.success) {
        window.location.href = 'http://localhost:4200/login';
      }
    });
  }
}
