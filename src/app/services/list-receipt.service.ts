import { Injectable } from '@angular/core';
import { ListReciepteLanguageData } from '../albaseet/models/ListReciepte';

@Injectable({
  providedIn: 'root'
})
export class ListReceiptService {

  constructor() { }
  getListReceiptDictionary() {
    return ListReciepteLanguageData.ListReciepteDictionary
  }
}
