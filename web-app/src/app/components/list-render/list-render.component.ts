import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  EventEmitter,
} from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-render',
  templateUrl: './list-render.component.html',
  styleUrls: ['./list-render.component.scss'],
})
export class ListRenderComponent implements OnInit, OnChanges {
  Object = Object;

  @Input() listTitle = '';
  @Input() backendRoute = '';
  @Input() filter: any = {};

  @Output() currentContents = new EventEmitter<any>();

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
        this.labels = contents.length > 0 ? Object.keys(this.contents[0]) : [];
        this.currentContents.emit(this.contents);
      });
  }
}
