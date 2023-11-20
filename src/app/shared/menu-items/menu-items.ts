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

  { state: 'CustomerList', nameNameAr: ' العملاء' ,nameNameEn:'Customer' , type: 'link', icon: 'account_circle',role:'null' },
  { state: 'productlist',nameNameAr: ' الاصناف' ,nameNameEn:'products', type: 'link', icon: 'shopping_basket' ,role:'null'},
  { state: 'paymontlsit',nameNameAr: '  طرق الدفع' ,nameNameEn:'payment', type: 'link', icon: 'payment' ,role:'null'},
  {
    state: 'InvoiceReport',
    type: 'link',
    nameNameAr: '  الفواتير ' ,nameNameEn:'Invoices', 
    icon: 'receipt',
    role:'null'
  },
  {
    state: 'ReiceptReport',
    type: 'link',
    nameNameAr: 'سندات القبض' ,nameNameEn:'Receipt', 
   
    icon: 'receipt',role:'null'
  },
  
  
  { state: 'Opertaion',nameNameAr: 'العمليات ' ,nameNameEn:'Transaction ', type: 'link', icon: 'payment' ,role:'null'},
  { state: 'reportTotal',nameNameAr: ' تقرير الاجمالي' ,nameNameEn:'Report Total ', type: 'link', icon: 'payment' ,role:'null'},
  { state: 'SalesTotal',nameNameAr: '  اجمالي المبيعات' ,nameNameEn:'Sales Total', type: 'link', icon: 'payment' ,role:'null'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
