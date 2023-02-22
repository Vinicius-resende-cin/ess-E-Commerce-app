import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Names from 'src/app/common/global-names';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiURL = Names.apiURL;

  constructor(private http: HttpClient) {}

  getAll(apiEndpoint: string): Observable<Object[]> {
    const endpointURL = this.apiURL + apiEndpoint;
    return this.http.get<Object[]>(endpointURL);
  }
}
