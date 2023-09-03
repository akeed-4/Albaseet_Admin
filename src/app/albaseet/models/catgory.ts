import { Injectable } from "@angular/core"

export interface Catgory {
clientNumberAr:string
clientNumberEn:string
productNumberAr:string
productNumberEn:string
InviocesNumberAr:string
InviocesNumberEn:string
RecieptNumberAr:string
RecieptNumberEn:string
}

const MENUITEMS = [

    { clientNumberAr:'العملاء',clientNumberEn:'Customer' },
    { productNumberAr:'الاصناف',productNumberEn:'Products' },
   
    { InviocesNumberAr:'الفواتير',InviocesNumberEn:'Invioces' },
    { RecieptNumberAr:'سندات القبض',RecieptNumberEn:'Reciept' },
   
    
  ];
  
  @Injectable()
  export class Catgores {
    getMenuitem(): any[] {
      return MENUITEMS;
    }
  }
  