export class payment_method{
  id:string
    customer_aname:string;
    customer_ename:string
    customer_id:string
}

  export interface countryDropDownDto{
    
    customer_aname?:string;
  
  }
  export class lsitPaymontDictionary {
    [key: string]: payment_method;
  }
  
  export class lsitPaymontLanguageData {
    public static lsitPaymontDictionary: lsitPaymontDictionary = {
      en: {
        customer_id:'customer_id',
        id:'customer id',
        customer_aname: 'Paymont Name Arabic',
        customer_ename: 'Paymont Name English',
       
      },
      ar: {
        customer_id:'رقم الكود',
        id:'الكود',
        customer_aname: 'الدفع عربي',
        customer_ename: 'الدفع انجليزي',
       
      }
    };
  }
  
  
  