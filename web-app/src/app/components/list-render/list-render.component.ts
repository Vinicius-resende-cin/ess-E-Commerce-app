import { Component, Input, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.scss'],
})
export class ListRenderComponent implements OnInit {
  @Input() listTitle = '';
  @Input() listType = '';

  contents: Object[] = [];
  labels: string[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.listService.getAll(this.listType).subscribe((contents) => {
      this.contents = contents;
      this.labels = Object.keys(contents[0]);
    });
  }
}
