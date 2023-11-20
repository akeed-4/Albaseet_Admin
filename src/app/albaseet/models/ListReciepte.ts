export interface ListReciepte{
    customer_aname:string;
    customer_address: string;
    receipt_date: string;
    receipt_amount:string
    receipt_acceptance:string
    receipt_no:string
    receipt_state:string
    user_name:string
  }
  export interface countryDropDownDto{
    product_id:string;
    product_aname?:string;
  
  }
  export class ListReciepteDictionary {
    [key: string]: ListReciepte;
  }
  
  export class ListReciepteLanguageData {
    public static ListReciepteDictionary: ListReciepteDictionary = {
      en: {
        user_name:"user_name",
        receipt_no:"receipt_no",
        customer_aname:'Customer Name Arabic',
        customer_address: 'Customer Adderss',
        receipt_date: 'Receipt Date',
        receipt_amount:'Receipt Amount',
        receipt_acceptance:'Receipt Acceptance',
        receipt_state:"receipt_state"
        
        
      },
      ar: {
        user_name:"اسم المستخدم",
        receipt_no:"رقم السند",
        customer_aname:'اسم العميل عربي',
        customer_address: 'عنوان العميل ',
        receipt_date: 'تاريخ السند ',
        receipt_amount:'مبلغ السند ',
        receipt_acceptance:'حالة السند',
        receipt_state:"حالة السند"
      }
    };
  }
  
  
  