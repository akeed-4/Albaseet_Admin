import { Injectable } from '@angular/core';
import { lsitCustomerDictionary, lsitCustomerLanguageData } from '../albaseet/models/lsitCustomer';
import { lsitTotaluserLanguageData } from '../albaseet/models/lsitTotalUser';

@Injectable({
  providedIn: 'root'
})
export class ListToTalUserService {

  constructor() { }

  getListToTalUserDictionary() {
    return lsitTotaluserLanguageData.lsitTotalUserDictionary
  }
}
