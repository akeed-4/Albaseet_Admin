export class payment_method{
    customer_aname:string;
    customer_ename:string
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
        customer_aname: 'Paymont Name Arabic',
        customer_ename: 'Paymont Name English',
       
      },
      ar: {
        customer_aname: 'الدفع عربي',
        customer_ename: 'الدفع انجليزي',
       
      }
    };
  }
  
  
  