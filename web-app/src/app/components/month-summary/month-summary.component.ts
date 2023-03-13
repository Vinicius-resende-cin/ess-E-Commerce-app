import { Component } from '@angular/core';
import * as myTypes from '../../common/global-types';

type Pedido = myTypes.Pedido;

@Component({
  selector: 'app-month-summary',
  templateUrl: './month-summary.component.html',
  styleUrls: ['./month-summary.component.scss'],
})
export class MonthSummaryComponent {
  Object = Object;

  filter: {} = {};
  listContents: Pedido[] = [];

  quantPedidos = 0;
  valorTotal = 0;
  media = 0;

  updateMetrics(newContents: Pedido[]) {
    this.listContents = newContents;
    this.quantPedidos = this.listContents.length;
    this.valorTotal = (() => {
      let sum = 0;
      this.listContents.forEach((e) => {
        sum += e.valor;
      });
      return sum;
    })();
    this.media = this.valorTotal / this.quantPedidos;
  }

  searchRange() {
    const startInput = document.querySelector(
      'input#start-month'
    )! as HTMLInputElement;
    const endInput = document.querySelector(
      'input#end-month'
    )! as HTMLInputElement;

    this.filter = {
      start:
        startInput.value == '' ? '' : new Date(startInput.value).toISOString(),
      end: endInput.value == '' ? '' : new Date(endInput.value).toISOString(),
    };
  }
}
