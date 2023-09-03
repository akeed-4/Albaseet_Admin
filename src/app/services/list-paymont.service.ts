import { Injectable } from '@angular/core';
import { ListPaymontMethodComponent } from '../albaseet/list-paymont-method/list-paymont-method.component';
import { lsitPaymontLanguageData } from '../albaseet/models/payment_method';

@Injectable({
  providedIn: 'root'
})
export class ListPaymontService {

  constructor() { }
  getListCustomerDictionary() {
    return lsitPaymontLanguageData.lsitPaymontDictionary
  }
}
