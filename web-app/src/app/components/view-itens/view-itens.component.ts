import { Component } from '@angular/core';
import { Itens } from 'src/app/common/global-types';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-view-itens',
  templateUrl: './view-itens.component.html',
  styleUrls: ['./view-itens.component.scss']
})
export class ViewItensComponent {
  itens_list!: Itens[];

  constructor(private itemservice: ItemService) { }

  ngOnInit(): void {
    this.getAllItens();
  }

  ngOnChanges(): void {
    this.getAllItens();
  }

  getAllItens(){
    this.itemservice.getAllItens().subscribe((result) => {
      this.itens_list = result as Itens[];
    });
  }
}
