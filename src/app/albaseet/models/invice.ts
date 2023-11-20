
import { customer } from "./customers";
import { inviceType } from "./inviceType";
import { InvoiceProductModel } from "./InvoiceProductModel";
import { nameModel } from "./namemodel";

export  class inivce{
    invoice_acceptance:Number;

    id:number;
    invoice_no:0;
    invoiceNo:number;
    customer_aname:string
    type:inviceType;
    totalAmountBeforTax:number;
    total_amount:number;
    paidAmount:number;
    paid_amount:number
    taxPersentage:number;
    taxAmount:number;
    editAmount:number;
    invoice_date:Date;
    approvalState:boolean;
    customer:customer;
    qrData:string;
    btc_titleAr:string;
    btc_titleEn:string;
    btb_titleAr:string;
    btb_titleEn:string;
    invoice_name:nameModel;
    customer_name:string;
    invioce_state:string
    products: InvoiceProductModel ;
  
  
}