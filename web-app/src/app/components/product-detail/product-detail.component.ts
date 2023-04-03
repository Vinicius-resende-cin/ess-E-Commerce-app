import { Component, OnInit, OnChanges } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import * as Types from 'src/app/common/global-types';

type Item = Types.Itens;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnChanges{
  item!: Item;

  constructor(private itemService: ItemService, private route: ActivatedRoute) {};

  ngOnInit(): void {
    this.getItem();
  }

  ngOnChanges(): void {
    this.getItem();
  }

  getItem(): void{
    const url = this.route.snapshot.url;
    const id = url[url.length - 1].path;
    
    this.itemService.getAll('/itens/' + id).subscribe((resultado) => {
      this.item = resultado as Item;
    })
  }

}
