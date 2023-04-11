import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Names from 'src/app/common/global-names';

@Injectable({
  providedIn: 'root',
})
// Serviço 'CustomLinksService'. Realiza a comunicação entre o frontend e o
// backend da feature 'gerar-link'
export class CustomLinksService {
  private apiURL = Names.apiURL;

  constructor(private http: HttpClient) {}

  // Insere um link personalizado e seu id no modelo 'CustomLink' (frontend)
  generateCustomLink(id: Number, url: String): Observable<Object> {
    const endpointURL = this.apiURL + '/customLinks';
    const newCustomLink = {
      "id": id,
      "url": url
    };

    return this.http.post<Object>(endpointURL, newCustomLink);
  }

  // Retorna todos os links personalizados e seus ids (frontend)
  getAllCustomLinks(): Observable<Object> {
    const endpointURL = this.apiURL + '/customLinks/';
    return this.http.get<Object>(endpointURL);
  };

  // Retorna um link personalizado associado ao id passado como parâmetro (frontend)
  getCustomLink(id: Number): Observable<Object> {
    const endpointURL = this.apiURL + '/customLinks/' + id;
    return this.http.get<Object>(endpointURL);
  }
}
