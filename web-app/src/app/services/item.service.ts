import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import * as Names from 'src/app/common/global-names'
import * as Types from 'src/app/common/global-types'

@Injectable({
    providedIn: 'root',
  })
  export class ItemService {
    private apiURL = Names.apiURL;

    constructor(private http: HttpClient) {}

    getAll(apiEndpoint: string): Observable<Object> {
      const endpointURL = this.apiURL + apiEndpoint;
      return this.http.get<Object>(endpointURL);
    }

    getAllItens() {
      const endpointURL = this.apiURL + '/itens';
      return this.http.get<Object>(endpointURL); 
    }

    createItem(newItem: Types.Itens) {
      const endpointURL = this.apiURL + '/itens';
      return this.http.post<Object>(endpointURL, newItem); 
    }
  }