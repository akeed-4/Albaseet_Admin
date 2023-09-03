import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { MyservcesService } from 'src/app/myservces.service';
import { customer } from '../models/customers';
import { inivce } from '../models/invice';
import { products } from '../models/products';
import { reportinv } from '../models/report';

@Component({
  selector: 'app-report-invioce-main',
  templateUrl: './report-invioce-main.component.html',
  styleUrls: ['./report-invioce-main.component.css']
})
export class ReportInvioceMainComponent {
  paletteColour: any;

  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  isAllreport: boolean
  checkallinvoiceupp:boolean;
  checkcustomerinvoi:boolean
  ispaymontinvice: boolean
  ispaymontcredit: boolean
  ischratlist: boolean
  reportproduct: boolean
  reportdatelimet: boolean
  isdate: boolean;
  isDaydate: boolean
  storagdate: any
  reportdatcustomer: boolean
  inviocereport!: FormGroup;
  message: string;
  id: number;
  chekall: any;

  img: File;
  btnTitle: string;
  title: string;
  IsEditMode: boolean;
  urlIamge: string;
  customers: customer;
  isreportdate: boolean;
  checkcash:boolean
  allinvoice:boolean
  product: products[];
  customer: customer[];
  isbusy: boolean;
  Details :boolean
  toggle: boolean
  selectedMembers: inivce[]
  report: reportinv;
  storedata: inivce[];
  checkinvoicunapprove:boolean;
  ischekdateinvioce:boolean
  checkedcredit:boolean
  Allinvioce:boolean
  checkreturn:boolean
  checkreturnNotapprove:boolean
  chekedAppro :boolean;
  checkproductinvoice:boolean
  invoice: any[];
dataArray:any[]
  messageValidate = {
    customername: {
      required: ' اسم العميل مطلوب!',
    },
    customerAddress: {
      required: ' الرجاء ادخال العنوان!',
    },
    customerEmail: {
      required: 'البريد الالكتروني مطلوب..!',
    },


    customerphone: {
      required: 'رقم الهاتف مطلوب..!',
    }
  };

  ngOnInit(): void {
   this.toggle = true;
    this.checkreturnNotapprove=false
    this.checkreturn=false
    this.Allinvioce=true
    this.Details = false
    this.ischekdateinvioce=false
    this.checkproductinvoice=false
    this.checkedcredit=false
    this.allinvoice=false;
    this.checkcustomerinvoi=false
    this.checkallinvoiceupp=false
    this.checkinvoicunapprove=false
    this.dataArray=[ "الكل"  , "النقدية","الاجلة","تقارير بيانيه","تقرير عميل "]
    this.chekedAppro = false;
    this.reportproduct = false
    this.invoice = [];
    this.checkcash=false
    this.storagdate;
    this.chekall = 1
    this.isDaydate = false
    this.selectedMembers = []
    this.isreportdate = false
    this.report = {
      enddate: new Date(),
      startdate: new Date()

    }
    this.reportdatelimet = false
    this.isAllreport = false
    this.isdate = false
    this.ispaymontinvice = false
    this.ispaymontcredit = false
    this.reportdatcustomer = false
    this.ischratlist = false
    $(document).ready(function () {

      $(".customer").toggle();

    });

    $(document).ready(function () {
      $("#a").click(function () {
        $(".customer").show();
      });
    });

    $(document).ready(function () {
      $("#b").click(function () {
        $(".customer").hide();
      });
    });



    this.inviocereport = this.fb.group({
      startdate: ['2022-07-01', Validators.required],

    });
    this.title = 'استعلام عن طرق الدفع';
    this.btnTitle = 'اضافة';
    this.id = 0;
    this.img = '' as unknown as File
    this.customer = [];
    this.product = [];
    this.message = '';
    this.urlIamge = 'assets/images/Add.png';



    this.inviocereport = this.fb.group({
      customername: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerphone: ['', Validators.required],
      customerAddress: ['', Validators.required],
      startdate: ['', Validators.required]
    });


    this.services.GetAllInices().subscribe((list: any) => {
      this.storedata = list.data;
      this.invoice = list.data;


      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    })
  }
  arrS: number[] = [];
  checkitem(value:any){

alert('sjkfjdgf')
  }
  change() {
    this.methodcheck();
    const date1=new Date()
   
    this.report.startdate =  this.inviocereport.value.startdate
 
    console.log(this.report.startdate)
    let startDate = new Date(this.report.startdate) ;
    let endDate =new Date(this.report.enddate)
    this.selectedMembers = this.invoice.filter(m => new Date(m.invoice_date) > startDate );
    return this.isreportdate = true;
  }

   changeFunc(i:any) {
    alert(i);
  }
  chekedApprove(){
    this.methodcheck();
    this.isAllreport = true;
    this.allinvoice=false;

    return this.chekedAppro = true;
  }
  checkreport() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.isAllreport = true;

  }
 
  checkpeymont1() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.ispaymontinvice = true;
  }

  ChangingValue(event:any){

  }
  checkpeymont2() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.ispaymontcredit = true;
  }
  checkpeymont3() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.ischratlist = true;
  }
  checkreportdatelimet() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.reportdatelimet = true;
  }
  methodcheck() {
    this.checkreturnNotapprove=false
    this.checkreturn=false
    this.Allinvioce=false
    this.checkinvoicunapprove=false;
    this.ischekdateinvioce=false
    this.Details = false
    this.checkallinvoiceupp=false;
    this.checkproductinvoice=false
    this.ispaymontinvice = false;
    this.checkedcredit=false;
    this.checkcustomerinvoi=false
    this.checkcash=false
    this.isAllreport = false;
 this.chekedAppro = false;
    this.ispaymontcredit = false;
    this.ischratlist = false;
    this.reportdatcustomer = false;
    this.reportdatelimet = false;
    this.isreportdate = false;
    this.isdate = false
    this.reportproduct = false
  }
  checkreportdatcustomer() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.reportdatcustomer = true;
  }
  checkreportdatproduct() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.reportproduct = true;
  }
  chekedUnApprove(){
    this.methodcheck();
    this.checkallinvoiceupp=true
     this.chekedAppro = false;
   
     return this.checkinvoicunapprove=true
  }
  checkcustomerinvoice(){
    this.methodcheck();
    this.checkinvoicunapprove=true;
    this.checkallinvoiceupp=false
    this.chekedAppro = false;
    return this.checkcustomerinvoi=true
  }
  previewinvioc() {

    window.print()

  }
  checkReturnInvioce(){
    this.methodcheck();
    this.isAllreport = false
    this.checkallinvoiceupp=false
    return this.checkreturn=true
  }
  checkReturnInvioceNotaaprov(){
    this.methodcheck();
    this.isAllreport = false
    this.checkallinvoiceupp=false
    return this.checkreturnNotapprove=true
  }
  checkreproduct(){

    this.methodcheck();
    this.checkinvoicunapprove=true;
    this.checkallinvoiceupp=false
    this.chekedAppro = false;
    return this.checkproductinvoice=true
  }
  chekedallinvoice(){
    this.methodcheck();

    this.checkinvoicunapprove = true;
    return this.allinvoice=true
  }
  changeWebsite(e: any) {
    return this.isAllreport = true;
  }
  checkreportAll(){
    this.methodcheck();
this.checkinvoicunapprove=true;
this.checkcash=false;

this.checkedcredit=false
this.checkinvoicunapprove=false
return this.checkallinvoiceupp=true

  }
  checkcash1(){
    this.methodcheck();
this.checkinvoicunapprove=true;
 this.checkallinvoiceupp=false
 this.checkedcredit=false
 return this.checkcash=true
  }
  checkcredit(){
    this.methodcheck();
    this.checkinvoicunapprove=true;
     this.checkallinvoiceupp=false
      this.checkcash=false;
      return this.checkedcredit=true

  }
  check() {
    this.methodcheck();
    this.chekedAppro = true;
    return this.isdate = true;
  }
  checkDetails() {
    this.methodcheck();
    this.chekedAppro = true;
    this.isdate = false;
    return this.Details = true;
  }
  checkdate(){
    this.methodcheck();
    this.checkinvoicunapprove=true;
    this.checkallinvoiceupp=false
    this.chekedAppro = false;
  
    return this.ischekdateinvioce=true
  }
  checkDay() {
    this.methodcheck();
    return this.isDaydate = true;
  }




  checkpeymont() {
    this.methodcheck();
    this.chekedAppro = false;
    this.checkinvoicunapprove=true;
    return this.ischratlist = true;
  }


}


