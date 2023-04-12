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
  
  /* GET das categorias para exibir todas as categorias na página */
  getCategories(): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias';

    return this.http.get<Object>(endpointURL);
  }

  /* POST para criação de uma nova categoria no banco de dados */
  createCategory(nome: String, descricao: String): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias';
    const novaCategoria = { 
      "nome_categoria": nome, 
      "descricao_categoria": descricao
    };
    
    return this.http.post<Object>(endpointURL, novaCategoria); 
  }

  /* PUT para editar a descrição de uma categoria já existente no banco de dados */
  editCategory(nome: String, descricao: String): Observable<Object> {
    const endpointURL = this.apiURL + '/categorias/' + nome;
    const descCategoria = {
      "descricao_categoria" : descricao
    };

    return this.http.put<Object>(endpointURL, descCategoria);
  }

  /* Métodos responsáveis por salvar as informações de uma categoria 
    selecionada na página de categorias para poder exibir essas 
    informações na página da edição da categoria específica */
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