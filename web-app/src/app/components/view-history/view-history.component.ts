import { Component, OnInit, OnChanges } from '@angular/core';
import * as myTypes from '../../common/global-types';
import { ListService } from 'src/app/services/list.service';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

type Pedido = myTypes.Pedido;
type Item = myTypes.Itens;

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.scss'],
})
export class ViewHistoryComponent implements OnInit, OnChanges {
  filter: {} = {};
  listaPedidos: Pedido[] = [];
  listaItem: Item[] = [];

  constructor(
    private listaservice: ListService,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.atualizarListas();
  }

  ngOnChanges() {
    this.atualizarListas();
  }

  // Armazenando os pedidos e os itens de cada pedido
  atualizarListaItens(pedido: Pedido): void {
    for (let item of pedido.id_produto) {
      if (!this.listaItem.find((a) => a._id?.toString() == item)) {
        this.itemService.getAll('/itens/' + item).subscribe((resultado) => {
          this.listaItem.push(resultado as Item);
        });
      }
    }
  }

  // Método que irá armazenar todos os produtos comprados pelo usuário
  atualizarListas(): void {
    this.listaservice.getAll('/pedidos').subscribe((result) => {
      var pedidoAdd: Pedido;
      for (let o of result) {
        pedidoAdd = o as Pedido;
        pedidoAdd.data_hora = new Date(pedidoAdd.data_hora);
        this.listaPedidos.push(pedidoAdd);
        this.atualizarListaItens(pedidoAdd);
      }
    });
  }

  // Método para descobrir a quantidade em estoque de um produto comprado
  consultarDisponibilidade(id: String): number {
    var item = this.listaItem.find((produto) => produto._id?.toString() == id);
    if (item) {
      return item.quantidade;
    }
    return 0;
  }

  // Método para descobrir o nome de um produto comprado
  consultarNome(id: String): String {
    var item = this.listaItem.find((produto) => produto._id?.toString() == id);
    if (item) {
      return item.nome;
    }
    return 'Desconhecido';
  }

  // Método para acessar a página de um produto comprado
  verProduto(id: String): void {
    if (this.consultarDisponibilidade(id) != 0) {
      this.router.navigate(['home/item', id]);
    } else {
      alert('Esse produto está indisponível');
    }
  }
}
