import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as Names from 'src/app/common/global-names';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = Names.apiURL;

  constructor(private http: HttpClient) {}

  checkSession(){
    const sessionUrl = '/auth/session';
    const endpointURL = this.apiURL + sessionUrl;
    const options = { withCredentials: true };

    return this.http.get<Object>(endpointURL, options);
  }

  login(email: string, password: string){
    const loginUrl = '/auth/login';
    const endpointURL = this.apiURL + loginUrl;
    const body = { email, password };
    const options = { withCredentials: true };

    return this.http.post<Object>(endpointURL, body, options);
  }
  
  logout(){
    const logoutUrl = '/auth/logout';
    const endpointURL = this.apiURL + logoutUrl;
    const body = {};
    const options = { withCredentials: true };

    return this.http.post<Object>(endpointURL, body, options);
  }

  requestReset(email: string){
    const resetReqUrl = '/usuarios/' + email;
    const endpointURL = this.apiURL + resetReqUrl;
    const body = {};
    const options = { withCredentials: true };

    return this.http.post<Object>(endpointURL, body, options);
  }

  changePassword(password: string, token: string){
    const changePassUrl = '/usuarios/';
    const endpointURL = this.apiURL + changePassUrl;
    const body = {password, token};
    const options = { withCredentials: true };

    return this.http.put<Object>(endpointURL, body, options);
  }
}
