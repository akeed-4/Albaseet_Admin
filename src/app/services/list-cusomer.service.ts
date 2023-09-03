import { Injectable } from '@angular/core';
import { lsitCustomerDictionary, lsitCustomerLanguageData } from '../albaseet/models/lsitCustomer';

@Injectable({
  providedIn: 'root'
})
export class ListCusomerService {

  constructor() { }

  getListCustomerDictionary() {
    return lsitCustomerLanguageData.lsitCustomerDictionary
  }
}
