export interface listTotalUser{
   id :string
   User_id :string
   user_name :string
   Total_cash :string
   totalRecipt :string
   SalesCreditReturn :string
   SalescashReturn :string
    SalsCash  :string
   SalsCrdit :string
   invoices_count:string

  }

  export class lsitTotalUserDictionary {
    [key: string]: listTotalUser;
  }
  
  export class lsitTotaluserLanguageData {
    public static lsitTotalUserDictionary: lsitTotalUserDictionary = {
      en: {
        invoices_count:'invoices_count',
        id :'id',
        User_id :' User_id',
        user_name :' user_name',
        Total_cash :' Net cash',
        totalRecipt :' totalRecipt',
        SalesCreditReturn :' SalesCreditReturn',
        SalescashReturn :'SalescashReturn',
         SalsCash  :' SalsCash',
        SalsCrdit :' SalsCrdit'
      },
      ar: {
        id :'الكود',
        User_id :'كود المستخدم',
        user_name :'اسم المستخدم',
        Total_cash :'  صافي المبالغ النقدية',
        totalRecipt :' سند قبض',
        SalesCreditReturn :'مردود بيع اجل',
        SalescashReturn :'مردود بيع نقدا',
         SalsCash  :' بيع نقدا',
        SalsCrdit :' بيع اجل',
        invoices_count:'عدد الفواتير'
      
      }
    };
  }
  
  
  