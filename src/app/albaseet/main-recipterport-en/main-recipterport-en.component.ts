import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import { customer } from '../models/customers';
import { inivce } from '../models/invice';
import { products } from '../models/products';
import { reportinv } from '../models/report';

@Component({
  selector: 'app-main-recipterport-en',
  templateUrl: './main-recipterport-en.component.html',
  styleUrls: ['./main-recipterport-en.component.css']
})
export class MainRecipterportENComponent {

  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  isAllreport: boolean
  ispaymontinvice: boolean;
  checkinvoicunapprove:boolean;
  chekedAppro :boolean;
  ispaymontcredit: boolean
  ischratlist: boolean
  reportproduct:boolean
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
  isreportdate: boolean
  product: products[];
  customer: customer[];
  allrecipt:boolean
  isbusy: boolean;
  reportdate:boolean
  selectedMembers: inivce[]
  report: reportinv;
  storedata: inivce[];
  reportcustomer:boolean
  invoice: any[];

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
  Allrecipt:boolean
  ngOnInit(): void {
    this.Allrecipt=true
    this.reportcustomer=false
    this.  chekedAppro =false
    this.reportdate=false
    this.reportproduct=false
    this.invoice = [];
    this.allrecipt=false
    this.storagdate;
    this.checkinvoicunapprove=false
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

    $(document).ready(function () {
      $("#c").click(function () {
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
  change() {
    this.methodcheck();
    this.report.startdate = this.inviocereport.value.startdate;
    console.log(this.report.startdate)
    let startDate = new Date(this.report.startdate);
    this.selectedMembers = this.invoice.filter(m => new Date(m.invoice_date) >= startDate);

  
    return this.isreportdate = true;
  }
  chekedApprove(){
    this.methodcheck();
    this.isAllreport = true;
    return this.chekedAppro = true;
  }
  previewinvioc() {

    window.print()

  }
  chekedUnApprove(){
    this.methodcheck();
    this.allrecipt=true
     this.chekedAppro = false;
     return this.checkinvoicunapprove=true
  }
  checkallrecipt(){
    this.methodcheck();
    this.checkinvoicunapprove=true
    return this.allrecipt=true
  }
  checkreportcustomer(){
    this.methodcheck();
    this.checkinvoicunapprove=true
    return this.reportcustomer=true
  }
  checkreportdate(){
    this.methodcheck();
    this.checkinvoicunapprove=true
    return this.reportdate=true
  }
  checkreport() {
    this.methodcheck();
    this.chekedAppro=true
    return this.isAllreport = true;

  }
  checkpeymont1() {
    this.methodcheck();
    return this.ispaymontinvice = true;
  }


  checkpeymont2() {
    this.methodcheck();
    return this.ispaymontcredit = true;
  }
  checkpeymont3() {
    this.methodcheck();
    return this.ischratlist = true;
  }
  checkreportdatelimet() {
    this.methodcheck();
    return this.reportdatelimet = true;
  }
  methodcheck() {
    this.ispaymontinvice = false;
    this.allrecipt=false;
    this.reportcustomer=false
    this.reportdate=false
    this.isAllreport = false;
    this.ispaymontcredit = false;
    this.checkinvoicunapprove=false;
    this.ischratlist = false;
    this.reportdatcustomer = false;
    this.reportdatelimet = false;
    this.isreportdate = false;
    this.  chekedAppro =false
    this.isdate = false
    this.reportproduct=false
    this.Allrecipt=false
  }
  checkreportdatcustomer() {
    this.methodcheck();
    this.chekedAppro=true
    return this.reportdatcustomer = true;
  }
  checkreportdatproduct(){
    this.methodcheck();
    
    return this.reportproduct = true;
  }
  changeWebsite(e: any) {
    return this.isAllreport = true;
  }
  check() {
    this.methodcheck();
    this.chekedAppro=true
    return this.isdate = true;
  }
  checkDay() {
    this.methodcheck();
    return this.isDaydate = true;
  }







}



