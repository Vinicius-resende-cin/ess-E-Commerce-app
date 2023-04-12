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
  listaPedidosBackup: Pedido[] = [];
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
    this.searchRange();
  }

  // Metodo para armazenar os itens de cada pedido
  atualizarListaItens(pedido: Pedido): void {
    // Loop para pegar cada item do pedido e armazenar ele na "lista" de itens
    for (let id of pedido.id_produto) {
      this.itemService.getAll('/itens/' + id).subscribe((item) => {
        this.listaItem.set(id, item as Item);
      });
    }
  }

  // Metodo para armazenar todos os pedidos e itens
  async iniciarListas() {
    const result = await this.listaservice.getAll('/pedidos').toPromise();
    var pedidoAdd: Pedido;

    if (result) {

      // Loop para pegar cada pedido recebido e armazenar ele e seus itens
      for (let obj of result) {
        pedidoAdd = obj as Pedido;
        pedidoAdd.data_hora = new Date(pedidoAdd.data_hora);

        // Armazenando o pedido na lista de backup
        this.listaPedidosBackup.push(pedidoAdd);

        // Chamado o método que irá armazenar os itens desse pedido
        this.atualizarListaItens(pedidoAdd);
      }
    }

    // Por fim, passamos o backup para o listaPedidos, que é a lista usada no html
    this.listaPedidos = this.listaPedidosBackup;
  }

  // Metodo para acessar a pagina de um produto comprado
  verProduto(id: String): void {
    // Caso o produto não esteja esgotado, iremos para o sua pagina
    if ( this.listaItem.get(id)?.quantidade != 0) {
      this.router.navigate(['home/item', id]);
    }
    
    // Caso esteja, iremos mostrar o aviso de que está esgotado e continuamos no historico
    else {
      alert('Esse produto está indisponível');
    }
  }

  // Metodo para os botoes de "comprar novamente"
  comprar(pedido: Pedido): void {
    var compras: data = {"item":[],"quantidade":[]};

    var nomes_indisponiveis: String[] = [];

    var nomes_insuficientes: String[] = [];

    var cont:number = 0;

    // Loop para ver se cada item tem quantidade o suficiente em estoque para realizar essa compra
    for (let i of pedido.id_produto) {
      var item = this.listaItem.get(i)

      // Caso tenhamos esse item em estoque
      if (item && item.quantidade > 0) {
        compras.item.push(item);

        // Caso a quantidade em estoque seja menor do que a quantidade pedida
        if(pedido.quantidade[cont] > item.quantidade) {
          compras.quantidade.push(item.quantidade);
          nomes_insuficientes.push(item.nome);    
        }

        // Caso a quantidade em estoque seja maior ou igual a pedida
        else {
          compras.quantidade.push(pedido.quantidade[cont])
        }
      }

      // Caso nao tenhamos esse item em estoque
      else if(item?.quantidade == 0) {
        nomes_indisponiveis.push(item.nome);
      }
      cont++;
    }

    // Caso algum dos itens nao esteja disponivel no estoque
    if (nomes_indisponiveis.length != 0) {
      alert('Os itens ' + nomes_indisponiveis + ' estão indisponíveis')
    }

    // Caso a quantidade em estoque de algum dos itens seja menor do que a comprada anteriormente
    if (nomes_insuficientes.length != 0) {
      alert('Não há unidades suficientes dos itens ' + nomes_insuficientes);
    }

    this.dataSharing.updateDataArray(compras);
    this.router.navigate(['home/cart']);
  }

  // Metodo para as datas que usaremos para filtrar os pedidos
  async searchRange() {
    const startInput = document.querySelector(
      'input#start-month'
    )! as HTMLInputElement;
    const endInput = document.querySelector(
      'input#end-month'
    )! as HTMLInputElement;

    var start = startInput.value == '' ? '' : new Date(startInput.value).toISOString();
    var end = endInput.value == '' ? '' : new Date(new Date(endInput.value).setMonth(new Date(endInput.value).getMonth()+1)).toISOString();

    // Chamando o metodo que ira filtrar os pedidos
    await this.filtrarPedidos(start, end);
  }

  // Metodo que ira filtrar os pedidos
  filtrarPedidos(start: string, end: string): void {

    // Armazenando todos os pedidos do historico novamente em listaPedidos para que possamos filtrar eles e mostrar no html
    this.listaPedidos = this.listaPedidosBackup;

    // Caso o usuario use uma data inicial e final para o filtro
    if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    this.listaPedidos = this.listaPedidos.filter(
      (pedido) =>
        pedido.data_hora.getTime() >= startDate.getTime() && pedido.data_hora.getTime() <= endDate.getTime());
    }

    // Caso o usuario use apenas uma data inicial
    else if (start) {
      const startDate = new Date(start);
      this.listaPedidos = this.listaPedidos.filter(
        (pedido) => pedido.data_hora.getTime() >= startDate.getTime());
    }

    // Caso o usuario use apenas uma data final
    else if (end) {
      const endDate = new Date(end);
      this.listaPedidos = this.listaPedidos.filter(
        (pedido) => pedido.data_hora.getTime() <= endDate.getTime());
    };
  };
};