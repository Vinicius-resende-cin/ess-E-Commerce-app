import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Names from 'src/app/common/global-names';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiURL = Names.apiURL;

  constructor(private http: HttpClient) {}

  createCategory(nome: String, descricao: String) {
    const endpointURL = this.apiURL + '/categorias';
    const novaCategoria = { 
      "nome_categoria": nome, 
      "descricao_categoria": descricao
    };
    
    return this.http.post<Object>(endpointURL, novaCategoria); 
  }

  getCategories(): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias';

    return this.http.get<Object>(endpointURL);
  }

  editCategory(nome: String, descricao: String) {
    const endpointURL = this.apiURL + '/categorias/' + nome;
    const categoria = {
      "descricao_categoria" : descricao
    };

    return this.http.put<Object>(endpointURL, categoria);
  }

  //Salva informaões da categoria que vai ser editada
  nomeCategoria: String = '';
  descricaoCategoria: String = '';
  setInfo(name: String, descricao: String) {
    this.nomeCategoria = name;
    this.descricaoCategoria = descricao;
  }  

  getName() {
    return this.nomeCategoria;
  }

  getDescription() {
    return this.descricaoCategoria;
  }
}