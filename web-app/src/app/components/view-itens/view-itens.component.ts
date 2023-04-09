import { Component } from '@angular/core';
import { Itens } from 'src/app/common/global-types';
import { ItemService } from 'src/app/services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-itens',
  templateUrl: './view-itens.component.html',
  styleUrls: ['./view-itens.component.scss']
})
export class ViewItensComponent {
  itens_list!: Itens[];

  constructor(private itemservice: ItemService,  private router: Router) { }

  ngOnInit(): void {
    this.getAllItensUser();
  }

  ngOnChanges(): void {
    this.getAllItensUser();
  }

  getAllItensUser(){
    this.itemservice.getAllItensUser().subscribe((result) => {
      this.itens_list = result as Itens[];
    });
  }

  editItemPage(item: Itens) {
    let id = ''

    if (item._id){
      id = item._id.toString()
      this.router.navigate(['home', 'view-itens', 'edit-item', id]);
    }
  }

  deleteItem(item: Itens){
    let id = ''

    if (item._id){
      id = item._id.toString()
    }
    

    this.itemservice.deleteItem('/itens/' + id).subscribe(() => {
      this.getAllItensUser();
    });
  }
}
