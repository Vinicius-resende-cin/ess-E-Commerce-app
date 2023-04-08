import { Component, ViewChild  } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import * as fs from 'fs';
import { Categoria, Itens } from 'src/app/common/global-types';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../../../common/usuario';

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})

export class RegisterItemComponent {
    category_list!: Categoria[];
    constructor(private itemservice: ItemService, private categoriaService: CategoriaService,  private authService: AuthService) { 
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
        this.itemservice.getEmailUser().subscribe((result) => {
          newItem.id_user = result.email;
        }),

        this.itemservice
        .createItem(newItem)
        .subscribe(
          (newItem) => {
            console.log(newItem);
          }
        )
    }

    ngOnInit(): void {
      this.getCategory();
    }
  
    ngOnChanges(): void {
      this.getCategory();
    }
  
    getCategory(): void {
      this.categoriaService.getCategories().subscribe((result) => {
        this.category_list = result as Categoria[];
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