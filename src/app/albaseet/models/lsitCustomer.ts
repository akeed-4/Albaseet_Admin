export interface listCustomer{
    customer_id: string;
    customernameRr: string;
    customer_aname:string;
    customer_ename: string;
    customer_address: string;
    customer_country: string;
    customer_city: string;
    balance:string
    customer_state: string;
    customer_mobile: string
    invoices_count:string;
    receipts_amount:string;
    customer_postcode:string
    customer_taxid:string,
    transactions:string,
    total_amount:string
    invoice_name:string
    invoice_date:string
    user_name:string

  }
  export interface countryDropDownDto{
    customer_id:string;
    customer_aname?:string;
  
  }
  export class lsitCustomerDictionary {
    [key: string]: listCustomer;
  }
  
  export class lsitCustomerLanguageData {
    public static lsitCustomerDictionary: lsitCustomerDictionary = {
      en: {
        user_name:"user_name",
        invoice_date:"invoice date",
        invoice_name:"invoice name",
        total_amount:"total amount",
        transactions:"transactions",
        customer_id: 'Cusomer Id',
        customernameRr: 'Customer Name Arabic',
        customer_aname:'Customer Name Arabic',
        customer_ename: 'Customer Name English',
        customer_mobile: 'Mobile',
        balance:'balance',
        customer_state: 'Customer State',
        customer_country:"Country",
        customer_taxid:"Customer Taxid",
        customer_address:"Customer Address",
        customer_city:"Cutsomer City",
        receipts_amount:' Reciepts Amount',
        customer_postcode:"Customer PostCode",
        invoices_count:"Invoices count"
      },
      ar: {
        user_name:"اسم المستخدم",
        invoice_date:"التاريخ",
        invoice_name:"العملية",
        total_amount:"المبلغ",
        transactions:"العلميات",
        customer_id: 'كود العميل',
        customernameRr: 'اسم العميل عربي',
        customer_aname:'اسم العميل عربي',
        customer_ename: 'اسم العميل انجليزي',
        customer_mobile: 'الجوال',
        invoices_count:'الفواتير ',
        customer_state: 'حاله العميل',
        customer_country:"البلد",
        customer_taxid:"الرقم الضريبي",
        customer_address:"البلد",
        customer_city:"المدينة",
        receipts_amount:' المبلغ',
        customer_postcode:"الرمز البريدي",
        balance:"الرصيد"
      }
    };
  }
  
  
  