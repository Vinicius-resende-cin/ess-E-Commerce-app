import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import * as Names from 'src/app/common/global-names';
import { Categoria } from 'src/app/common/global-types';

@Injectable({
    providedIn: 'root'
  })
export class CategoryService {
    private apiURL = Names.apiURL;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {}

    createCategory(categoria: Categoria): Observable<Categoria> {
        return this.http.post<any>(this.apiURL + "/categoria", categoria, {headers: this.headers})
        .pipe( 
           retry(2),
         ); 
    }

    updateCategory(categoria: Categoria): Observable<Categoria> {
        return this.http.put<any>(this.apiURL + "/categoria",JSON.stringify(categoria), {headers: this.headers})          
            .pipe( 
                retry(2),
             ); 
      }

    getCategories(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiURL + "/categorias")
            .pipe(
                retry(2)
             );
      }
}