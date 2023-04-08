import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Names from 'src/app/common/global-names';
import { User } from '../../../../common/usuario';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiURL = Names.apiURL;
    private headers = new HttpHeaders({'Content-Type': 'application/json'});
    

    constructor(private http: HttpClient) {}

    createUser(user: {}){
        
        return this.http.post<any>(this.apiURL + "/users", user, {headers: this.headers})
    }

    gelAllUsers(){
        return this.http.get<User[]>(this.apiURL + "/users", {withCredentials: true})
    }

    deleteUser(user: User, passorwdTest:string){
        console.log(user)
        return this.http.delete<any>(this.apiURL + "/users/" + user.cpf + '/' + passorwdTest, {headers: this.headers, withCredentials: true})
    }

    getCurrentUser(){
        return this.http.get<User[]>(this.apiURL + "/users/session", {withCredentials: true})
    }

    updateUserPermission(user:User, passorwdTest:string){
        return this.http.put<any>(this.apiURL + "/users/" + passorwdTest, user, {headers: this.headers, withCredentials: true})
    }
}