import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs';
import { lsitproductDictionary, lsitproductLanguageData } from '../albaseet/models/ListProduct';

@Injectable({
  providedIn: 'root'
})
export class lstproductService {

  constructor(private http: HttpClient) {}
  private sharedAPI="https://localhost:44377/ShowRoom/";
  private apiURL = this.sharedAPI + '/Countries';

 

  getAllCountriesDropDown() {
    return this.http.get<any[]>(`${this.apiURL}/GetAllCountriesDropDown`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  save(country: any) {
    return this.http.post(this.apiURL, country);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  getListprodcutDictionary() {
    return lsitproductLanguageData.lsitproductDictionary;
  }

}

