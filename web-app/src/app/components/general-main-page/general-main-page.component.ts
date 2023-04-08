import { Component } from '@angular/core';
import { Itens } from 'src/app/common/global-types';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-general-main-page',
  templateUrl: './general-main-page.component.html',
  styleUrls: ['./general-main-page.component.scss']
})
export class GeneralMainPageComponent {
  itens_list!: Itens[];
  
  constructor(private itemservice: ItemService) {}

  ngOnInit() {
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
