import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  nameNameAr: string;
  nameNameEn:string
  type: string;
  icon: string;
  role:string
}

const MENUITEMS = [

  { state: 'listcustomer', nameNameAr: ' العملاء' ,nameNameEn:'Customer' , type: 'link', icon: 'account_circle',role:'null' },
  { state: 'listproduct',nameNameAr: ' الاصناف' ,nameNameEn:'products', type: 'link', icon: 'shopping_basket' ,role:'null'},
  { state: 'lsitpaymont',nameNameAr: '  طرق الدفع' ,nameNameEn:'payment', type: 'link', icon: 'payment' ,role:'null'},
  {
    state: 'reportinvioce',
    type: 'link',
    nameNameAr: '  الفواتير ' ,nameNameEn:'Invoices', 
    
    icon: 'receipt'
    ,
    role:'null'
  },
  {
    state: 'listReicept',
    type: 'link',
    nameNameAr: 'سندات القبض' ,nameNameEn:'Receipt', 
   
    icon: 'receipt',role:'null'
  },
  
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
