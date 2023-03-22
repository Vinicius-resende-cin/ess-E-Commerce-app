import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Names from 'src/app/common/global-names';
import { User } from '../../../../commom/usuario';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiURL = Names.apiURL;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    

    constructor(private http: HttpClient) {}

    createUser(user: {}){
        
        const params = new HttpParams({ fromObject: user });
        console.log(params.get('map'))
        return this.http.post<any>(this.apiURL + "/users", user, {headers: this.headers})
    }
}