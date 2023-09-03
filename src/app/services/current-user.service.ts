import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private http: HttpClient) {}
  private apiURL =''
  private adminURL =''


  getUserData() {
    return this.http.get<any>(`${this.apiURL}/Admin/GetUserBasicData`);
  }

  ChangeUserLanguage(languageCode : string) {
    return this.http.post(this.apiURL +'/Admin/ChangeUserLanguage',null, { params: {languageCode:languageCode} });
  }
  userCanDo(flagId : number){
    return this.http.get<boolean>(`${this.apiURL}/Admin/UserCanDo`, { params: {flagId:flagId} });
  }
  userCanDoMutli(flags : number[]){
    return this.http.get<any[]>(`${this.apiURL}/Admin/UserCanDo`, { params: {flags:flags} });
  }
  // getUserFlags(){
  //   TODO: //Production READY
  //   return fillArrayWithinRange(1, 1000);
  //   //  return this.http.get<number[]>(`${this.apiURL}/Admin/GetUserFlags`);
  // }
  userCanRoute(routingUrl : string){
    return this.http.get<boolean>(`${this.apiURL}/Admin/UserCanRoute`, { params: {routingUrl:routingUrl} });
  }

}

