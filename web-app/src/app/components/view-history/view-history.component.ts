import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { ListService } from 'src/app/services/list.service';
import { ItemService } from 'src/app/services/item.service';
import { DataSharingService } from 'src/app/services/datasharing.service';

import * as myTypes from '../../common/global-types';

type Pedido = myTypes.Pedido;
type Item = myTypes.Itens;
type data = myTypes.dataSharing;

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss'],
})
export class ViewHistoryComponent implements OnInit, OnChanges {
  filter: {} = {};
  listaPedidos: Pedido[] = [];
  listaItem: Map<String, Item> = new Map<String, Item>();

  constructor(
    private listaservice: ListService,
    private router: Router,
    private itemService: ItemService,
    private dataSharing: DataSharingService,
  ) {}

  ngOnInit() {
    this.iniciarListas();
  }

  ngOnChanges() {
    this.filtrarPedidos();
  }

  // Armazenando os pedidos e os itens de cada pedido
  atualizarListaItens(pedido: Pedido): void {
    for (let id of pedido.id_produto) {
      this.itemService.getAll('/itens/' + id).subscribe((item) => {
        this.listaItem.set(id, item as Item);
      });
    }
  }

  // Método que irá armazenar todos os produtos comprados pelo usuário
  async iniciarListas() {
    const result = await this.listaservice.getAll('/pedidos').toPromise();
    var pedidoAdd: Pedido;

    if (result) {
      for (let obj of result) {
        pedidoAdd = obj as Pedido;
        pedidoAdd.data_hora = new Date(pedidoAdd.data_hora);
        this.listaPedidos.push(pedidoAdd);
        this.atualizarListaItens(pedidoAdd);
      }
    }
  }

  // Método para acessar a página de um produto comprado
  verProduto(id: String): void {
    if ( this.listaItem.get(id)?.quantidade != 0) {
      this.router.navigate(['home/item', id]);
    } else {
      alert('Esse produto está indisponível');
    }
  }

  comprar(pedido: Pedido): void {
    var compras: data = {"item":[],"quantidade":[]};
    var ids_indisponiveis: String[] = [];
    var ids_insuficientes: String[] = [];
    var cont:number = 0;

    for (let i of pedido.id_produto) {
      var item = this.listaItem.get(i)
      if (item && item.quantidade != 0) {
        compras.item.push(item);

        if(pedido.quantidade[cont] > item.quantidade) {
          compras.quantidade.push(item.quantidade);
          ids_insuficientes.push(item.nome);    
        }
        else {
          compras.quantidade.push(pedido.quantidade[cont])
        }
      }
      else if(item?.quantidade == 0) {
        ids_indisponiveis.push(item.nome);
      }
      cont++;
    }

    if (ids_indisponiveis.length != 0) {
      alert('Os itens ' + ids_indisponiveis + ' estão indisponíveis')
    }

    if (ids_insuficientes.length != 0) {
      alert('Não há unidades suficientes dos itens ' + ids_insuficientes);
    }

    this.dataSharing.updateDataArray(compras);
    this.router.navigate(['home/cart']);
  }

  filtrarPedidos(): void {};
}