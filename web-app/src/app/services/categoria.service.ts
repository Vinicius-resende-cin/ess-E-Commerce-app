import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as Names from 'src/app/common/global-names';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiURL = Names.apiURL;

  constructor(
    private http: HttpClient
  ) {}

  getCategories(): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias';

    return this.http.get<Object>(endpointURL);
  }

  createCategory(nome: String, descricao: String): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias';
    const novaCategoria = { 
      "nome_categoria": nome, 
      "descricao_categoria": descricao
    };
    
    return this.http.post<Object>(endpointURL, novaCategoria); 
  }

  editCategory(nome: String, descricao: String): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias/' + nome;
    const descCategoria = {
      "descricao_categoria" : descricao
    };

    return this.http.put<Object>(endpointURL, descCategoria);
  }

  //Salva informações da categoria que vai ser editada
  nomeCategoria: String = '';
  descricaoCategoria: String = '';
  setInfo(name: String, descricao: String): void {
    this.nomeCategoria = name;
    this.descricaoCategoria = descricao;
  }  

  getName(): String {
    return this.nomeCategoria;
  }

  getDescription(): String {
    return this.descricaoCategoria;
  }
}