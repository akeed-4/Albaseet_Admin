import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Login } from '../albaseet/models/login';

@Injectable({
  providedIn: 'root'
})
export class loginAouthservice {
  private baseUrl="http://baseet.selfip.com:8096/"

  apiurl=''
  constructor(private http: HttpClient, private router: Router) { }

  tokenresp: any;
  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),

  };
 
  Proceddlogin(login: any): Observable<any> {
    return this.http.post<Login>(this.baseUrl + 'loginAdmin', login, this.headers).pipe();
  }
  GenerateRefreshToken() {
    let input = {
      "jwtToken": this.GetToken(),
      "refreshToken": this.GetRefreshToken()
    }
    return this.http.post(this.apiurl + 'refresh', input);
  }

  IsLogged() {
    return localStorage.getItem("token") != null;
  }
  GetToken() {
    return localStorage.getItem("token") || '';
  }
  GetRefreshToken() {
    return localStorage.getItem("refreshtoken") || '';
  }

  SaveTokens(tokendata: any) {
    localStorage.setItem('token', tokendata.jwtToken);
    localStorage.setItem('refreshtoken', tokendata.refreshToken);
  }

  Logout() {
    alert('Your session expired')
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  GetRolebyToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = JSON.parse(atob(_token))
    return this.tokenresp.role;
  }

  GetMenubyrole(role: any) {
    return this.http.get(this.apiurl + 'GetMenubyRole/' + role)
  }
  HaveAccess(role: any, menu: any) {
    return this.http.get(this.apiurl + 'HaveAccess?role=' + role + '&menu=' + menu);
  }
  LogoutUsers() {
    
    return this.http.get(this.baseUrl + 'logout', this.headers).pipe();
  }

}
