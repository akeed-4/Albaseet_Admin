import { customer } from "./customers";

export interface ReportListInvioces{
    invoice_acceptance:string;
  
    id:string;
    invoice_name:string
    invoiceNo:string;
    customer_address:string
   customer_aname:string
    totalAmountBeforTax:string;
    total_amount:string;
    product_aname:string
    paid_amount:string
    taxPersentage:string;
    tax_amount:string;
    editAmount:string;
    invoice_date:string;
    approvalState:string;
    invoice_type:string
    qrData:string;
    amount_before_tax:string
user_name:string
  

  }
  export interface countryDropDownDto{
    invoiceNo:string;
   
  
  }
  export class ReportListInviocesDictionary {
    [key: string]: ReportListInvioces;
  }
  
  export class ReportListInviocesLanguageData {
    public static ReportListInviocesDictionary: ReportListInviocesDictionary = {
      en: {
        id:'Id Number',
        invoiceNo:'Invioce Number',
        totalAmountBeforTax:'Amount before tax',
        total_amount:'Total Amount',
        paid_amount:'Paid Amount',
        taxPersentage:'',
        amount_before_tax:'Amount Before Tax',
        tax_amount:'Tax Amount',
        editAmount:' Amount Edit',
        invoice_date:'Invioce Date',
        approvalState:'Approval State',
        customer_address:'Customer Address',
        customer_aname:'Customer Aname',
        qrData:'qrData',
        invoice_acceptance:'Invoice Acceptance',
        invoice_type:'invoice_type',
        product_aname:'product_aname',
        invoice_name:"invoice_name",
        user_name:"user_name"
      },
      ar: {
        id:'الكود',
        invoiceNo:'رقم الفاتورة',
        totalAmountBeforTax:'المبلغ قبل الضريبة',
        total_amount:'المبلغ الاجمالي',
        paid_amount:'المبلغ المدفوع',
        taxPersentage:'',
        amount_before_tax:'المبلغ قبل الضريبة',
        tax_amount:'مبلغ الضريبة',
        editAmount:'تحرير المبلغ',
        invoice_date:'تاريخ الفاتورة',
        approvalState:'حالة الاعتماد',
        customer_address:'عنوان العميل',
        customer_aname:'اسم العميل',
        qrData:'باركود',
        invoice_type:'نوع الفاتورة',
        invoice_acceptance:'حاله الفاتورة',
        product_aname:'اسم الصنف',
        invoice_name:'حالة الدفع',
        user_name:"اسم المستخدم"
      }
    };
  }
  
  
  