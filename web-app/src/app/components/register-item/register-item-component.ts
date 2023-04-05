import { Component } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';

import { Itens } from 'src/app/common/global-types';


@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss']
})

export class RegisterItemComponent {
    constructor(private itemservice: ItemService) { 
    }

    item: Itens = {
      id: '',
      nome: '',
      descricao: '',
      imagem: null,
      quantidade: 0,
      preco: 0,
      forma_pagamento: [],
      categoria: []
    };

    cadastrarItem(newItem: Itens) {
        this.itemservice
        .createItem(newItem)
        .subscribe(
          (newItem) => {
            console.log(newItem);
          }
        )
    }
}
