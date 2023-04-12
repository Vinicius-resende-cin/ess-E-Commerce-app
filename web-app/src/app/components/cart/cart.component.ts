import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/datasharing.service';

import * as Types from 'src/app/common/global-types';
import { Router } from '@angular/router';

type Item = Types.Itens;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  listaItem: Item[] = [];
  preco: number = 0;
  quant: number[] = [];

  constructor(private dataSharing: DataSharingService,
              private router: Router) {};

  ngOnInit(): void {
      this.dataSharing.atualDataArray.subscribe((array) => {
        this.listaItem = array.item;
        this.quant = array.quantidade;
        this.preco = this.calcularPreco();
      });
  }

  calcularPreco(): number {
    var preco: number = 0;

    for (let i of this.listaItem) {
      preco += i.preco*this.quant[this.listaItem.findIndex((a) => a == i)];
    }

    return preco;
  }
}

