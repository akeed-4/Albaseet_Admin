import { Injectable } from '@angular/core';
import { ReportListInviocesLanguageData } from '../albaseet/models/ReportListInvioces';

@Injectable({
  providedIn: 'root'
})
export class ListInvoicesService {

  constructor() { }
  getListInvoicesDictionary() {
    return ReportListInviocesLanguageData.ReportListInviocesDictionary
  }
}
