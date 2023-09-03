import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Login } from './albaseet/models/login';
import { registarcar } from './albaseet/models/modells/RegistarCar';






@Injectable({
  providedIn: 'root'
})
export class AuthoService {
  private baseUrl = "https://localhost:44389/";
  private url = "https://localhost:44377/Account/";
  private url2 = "https://localhost:44377/Admin/";
  role: string
permationdetails:any[]
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),


    //withCredentials: true,
  };
  expire: string;
  constructor(private http: HttpClient) {
    if (this.isUserRegistered()) {

      this.role = localStorage.getItem('role');
    }
  }
getAllpermation(){
  return this.http.get<any>(this.url2 + 'GetAllPermation' , this.headers).pipe();
}
  IsExpiredDate(day: string) {
    this.expire = localStorage.getItem('expire')

    const dateNow = new Date();

    const dateExpire = new Date(Date.parse(day));
    if (dateExpire < dateNow) {
      return true;
    }
    return false;
  }
  UserLogin(log: any): Observable<any> {

    return this.http.post<Login>(this.baseUrl + 'Login', log, this.headers).pipe();

  }
  GetUserRolse(): Observable<any[]> {
    return this.http.get<any[]>(this.url2 + 'GetUsersRoles', this.headers).pipe();
  }
  isUserRegistered() {
    const email = !!localStorage.getItem('email');

    const role = !!localStorage.getItem('role');
    if (email && role) {
      return true;
    }
    return false;
  }

  GetRoleName(email: string) {

    return this.http.get(this.url + 'GetRoleName/' + email, { responseType: 'text', }).pipe();
  }
  GetAllpermation(email: string) {

    return this.http.get(this.url2 + 'GetAllPermation/' + email, this.headers).pipe();
  }
  GetShowRoomName(email: string) {

    return this.http.get(this.url + 'GetShowName/' + email, this.headers ).pipe();
  }
  registrcars(formData: registarcar) {
    console.log(formData);
    return this.http.post<registarcar>(this.url + 'Addcar', formData, this.headers).pipe();
  }
  LogoutUsers() {
    return this.http.get(this.baseUrl + 'logout', this.headers).pipe();
  }

  getAlluser() {
    return this.http.get(this.url2 + 'GetAllUsers', this.headers).pipe();
  }
  Getuseres(id: string): Observable<any> {
    return this.http.get<any>(this.url2 + 'Getuseres/' + id, this.headers).pipe();
  }
  EditUserRole(model: any): Observable<any> {
    return this.http.put<any>(this.url2 + 'editRoleUser', model, this.headers).pipe();
  }
  public GetAllRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.url2 + 'GetAllRoles', this.headers).pipe();

  }
  
}