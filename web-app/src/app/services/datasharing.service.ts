import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as Types from 'src/app/common/global-types';

type data = Types.dataSharing;

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private dataArray = new BehaviorSubject<data>({"item":[],"quantidade":[]});
  confirmPassword!: boolean;

  atualDataArray = this.dataArray.asObservable();

  constructor() { };

  updateDataArray(data: data) {
    this.dataArray.next(data);
  }


}