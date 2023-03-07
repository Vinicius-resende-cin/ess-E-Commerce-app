import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.scss'],
})
export class ListRenderComponent implements OnInit, OnChanges {
  @Input() listTitle = '';
  @Input() backendRoute = '';
  @Input() filter: any = {};

  Object: any = Object;

  contents: Object[] = [];
  labels: string[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.getItems(this.filter);
  }

  ngOnChanges(): void {
    this.getItems(this.filter);
  }

  getItems(filter: any = {}) {
    this.listService
      .getFilter(this.backendRoute, filter)
      .subscribe((contents) => {
        this.contents = contents;
        this.labels = Object.keys(contents[0]);
      });
  }
}
