import { Component, ViewChild  } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import * as fs from 'fs';
import { Categoria, Itens } from 'src/app/common/global-types';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../../../common/usuario';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})

export class RegisterItemComponent {
    category_list!: Categoria[];
    email!: String;
    constructor(private itemservice: ItemService, private categoriaService: CategoriaService,  private userservice: UserService, private router: Router) { 
    }

    item: Itens = {
      _id: null,
      id_user: '',
      nome: '',
      descricao: '',
      imagem: null,
      quantidade: 0,
      preco: 0,
      forma_pagamento: [],
      categoria: []
    };

    cadastrarItem(newItem: Itens) {
        newItem.id_user = this.email;
        this.itemservice
        .createItem(newItem)
        .subscribe(
          (newItem) => {
            this.router.navigate(['home', 'view-itens']);
          }
        );
    }

    ngOnInit(): void {
      this.getCategory();
      this.getEmail();
    }
  
    ngOnChanges(): void {
      this.getCategory();
    }
  
    getCategory(): void {
      this.categoriaService.getCategories().subscribe((result) => {
        this.category_list = result as Categoria[];
      });
    }

    getEmail(){
      this.userservice.getCurrentUser().subscribe((result) => {
        this.email = result[0].email;
      });
    }
    
    validarCadastro(): boolean {
      const quantidade = (<HTMLInputElement>document.getElementById('input-quantidade')).value;
      const preco = (<HTMLInputElement>document.getElementById('input-preco')).value;
      const forma_pagamento = (<HTMLInputElement>document.getElementById('input-pagamento')).value;
      const categoria = (<HTMLInputElement>document.getElementById('input-categoria')).value;
      const titulo = (<HTMLInputElement>document.getElementById('input-nome')).value;
      const descricao = (<HTMLInputElement>document.getElementById('input-desc')).value;
      const imagem = (<HTMLInputElement>document.getElementById('input-image')).value;
  
      if (quantidade && preco && forma_pagamento && categoria && titulo && descricao && imagem) {
        return true;
      }
      return false;
    }
}