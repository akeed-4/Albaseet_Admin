import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import { approveinvice } from '../models/approveinvice';
import { customer } from '../models/customers';
import { inivce } from '../models/invice';
import { products } from '../models/products';
import { recipte } from '../models/recipte';

@Component({
  selector: 'app-dashbora-home',
  templateUrl: './dashbora-home.component.html',
  styleUrls: ['./dashbora-home.component.css']
})
export class DashboraHomeComponent implements OnInit {
  showda: boolean;

  constructor(  private servicess: MyservcesService,private route: Router,) {
 
  }
  price1:number;
  price2:number
  price: any
  storedata: any;
  invoice: inivce[];
  products: products[];
  recipte: recipte[];
  approve: boolean;
  num: number;
  num1: number;
  num2: number;
  num3:number
  invioce: inivce;
  customers: customer[];
  aprove: approveinvice;
  message: string;
  customer_aname: any;

  customer: customer[];
  isUserList!: boolean;
  isAddUser!: boolean;
  isproductslist!: boolean;
  isAddhospital!: boolean;
  isDepartmentList!: boolean;
  isAdddepartment!: boolean;
  isEn:boolean
  isAddPatient!: boolean;
  ischratlist!: boolean
  isAllreport: boolean;
  isUserRoleList!: boolean;
  isPatientList!: boolean;
  isCustomerList!: boolean;
  isAddcustomer!: boolean;
  isInvice!: boolean;
  isaaddOreder!: boolean;
  isdivbar!: boolean;
  isinvicese!: boolean;
  isar:boolean;
  status:string
  ischeckhome: boolean
  ispaymont!: boolean
  ispaymontinvice!: boolean
  ischarlist: boolean;
  isrecipte: boolean;
  islistcustomer1: boolean;
  islistcustomer2: boolean;
  islistcustomer3: boolean;
  islistproduct: boolean;
  ispaymontcredit: boolean;
  ispaymontMehod: boolean
  reportdatelimet: boolean;
  reportAll: boolean;
  isTestviewdata: boolean
  isRecipt: boolean;
  reportdatcustomer: boolean;
  reportproduct: boolean
  ngOnInit(): void {
    this.showda=false
    this.price1=0;
    this.price2=0
    this.status=''
    this.isEn=false
this.isar=false
    this.price = 0
    this.num1 = 0;
    this.num3 = 0
    this.storedata = '';
    this.num2 = 0
    this.aprove = {
      id: 0
    }
    this.approve = false;
    this.num = 0;
    this.customer_aname = '';
    this.invoice = [];
    this.message = '';
    this.customers = []
    this.recipte = [];
    this.getInvice();
    this.GetAllcustmer();
    this.getrecipte();
    this.Getproducts()
    this.customer = [];
    this.ischratlist = false
    this.islistcustomer1 = false;
    this.islistcustomer2 = false;
    this.islistcustomer3 = false;
    this.customer_aname = '';
    this.ispaymontcredit = false
    this.ischeckhome = true
    this.reportdatelimet = false
    this.islistproduct = false;
    this.ischarlist = false;
    this.reportproduct = false
    this.reportAll = false
    this.isdivbar = false;
    this.reportdatcustomer = false;
    this.isAllreport = false;
    this.isAddUser = false;
    this.isaaddOreder = false;
    this.isAddhospital = false;
    this.isAdddepartment = false;
    this.isUserList = false;
    this.isRecipt = false;
    this.isproductslist = false;
    this.isDepartmentList = false;
    this.isinvicese = false;
    this.isUserRoleList = false;
    this.isPatientList = false;
    this.isAllreport = false;
    this.isAddPatient = false;
    this.isAddcustomer = false;
    this.isCustomerList = false;
    this.isproductslist = false;
    this.ispaymont = false
    this.isrecipte = false;
    this.ispaymontMehod = false;

    this.isTestviewdata = false

    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });
   
      $('#customer').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#product').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });

      $('#invioce').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#recipt').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#payment').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#reportinvioce').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#reportrecipt').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
      $('#required').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay

      });
    });


    if (sessionStorage.getItem("hospital")) {
      this.Checkproduct();
      sessionStorage.removeItem("hospital");

    } else if (sessionStorage.getItem("patient")) {
      this.CheckPatient();
      sessionStorage.removeItem("patient");

    } else if (sessionStorage.getItem("customer")) {
      this.Checkcustomer();
      sessionStorage.removeItem("customer");

    } else if (sessionStorage.getItem("users")) {
      this.CheckUser();
      sessionStorage.removeItem("users");

    }
    else if (
      sessionStorage.getItem("product")) {
      this.Checkproduct();
      sessionStorage.removeItem("product");

    }


  }
  closenave(){
    const let2=localStorage.getItem("lang")
return this.status=let2
  }
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  
  methodcheck() {
    this.showda=false
    this.ispaymontMehod = false;
    this.isInvice = false;
    this.reportproduct = false
    this.isAddUser = false;
    this.isAdddepartment = false;
    this.ispaymontcredit = false
    this.isproductslist = false;
    this.isDepartmentList = false;
    this.isUserRoleList = false;
    this.ischeckhome = false
    this.islistproduct = false
    this.ispaymontinvice = false;
    this.isrecipte = false;
    this.reportdatelimet = false
    this.isPatientList = false;
    this.isAddPatient = false;
    this.isAddcustomer = false;
    this.ischarlist = false;
    this.isCustomerList = false;
    this.reportdatcustomer = false;
    this.isinvicese = false;
    this.ischratlist = false
    this.islistcustomer3 = false;
    this.isRecipt = false;
    this.islistcustomer2 = false
    this.isaaddOreder = false;
    this.islistcustomer1 = false
    this.ispaymont = false;
    this.isAllreport = false;
    this.reportAll = false;
    this.isTestviewdata = false
  }
  showlistcustomer() {
    this.methodcheck();


    return this.islistcustomer1 = true;
  }
  showdat(){
    return this.showda=true
  }
  checkcustomer(){
    this.ischeckhome=false
    return this.isCustomerList=true
  }
  showlist2customer() {
    this.methodcheck();

    return this.islistcustomer2 = true;
  }
  showlist3customer() {
    this.methodcheck();

    return this.islistcustomer3 = true;
  }


  showlist1produc() {
    this.methodcheck();
    this.islistcustomer1 = false;
    this.isCustomerList = false;
    this.islistcustomer2 = false;
    this.isproductslist = false;
    this.islistcustomer3 = false;
    return this.islistproduct = true
  }
  CheckUser(): boolean {
    this.methodcheck();
    return this.isUserList = true;
  }



  CheckUserRoleList(): boolean {
    this.methodcheck();
    return this.isUserRoleList = true;
  }

  Checkproduct(): boolean {
    this.methodcheck();
    return this.isproductslist = true;

  }

  CheckDepartment(): boolean {
    this.methodcheck();
    return this.isDepartmentList = true;

  }

  AddUser() {
    this.methodcheck();
    return this.isAddUser = true;
  }
  Checkorder() {
    this.methodcheck();

    return this.isInvice = true;
  }
  CheckReport(): boolean {
    this.methodcheck();
    return this.ischarlist = true;

  }
  SelectAll() { }
  AddOrder() {
    this.methodcheck();
    return this.isaaddOreder = true;
  }
  Add_paymeont() {
    this.methodcheck();
    return this.ispaymontMehod = true;
  }
  checkreport() {
    this.methodcheck();
    return this.isAllreport = true;
  }

  checkreportdatelimet() {
    this.methodcheck();
    return this.reportdatelimet = true;
  }
  checkAllreport() {
    this.methodcheck();
    return this.reportAll = true;
  }
  checkreportProduct() {
    this.methodcheck();
    return this.reportproduct = true;
  }
  checkreciptreport() {
    this.methodcheck();
    return this.isRecipt = true;
  }
  checkinvgice() {
    this.methodcheck();
    return this.isinvicese = true;
  }
  checkreportdatcustomer() {
    this.methodcheck();
    return this.reportdatcustomer = true;
  }
  checkpeymont() {
    this.methodcheck();
    return this.ispaymont = true;
  }
  checkpeymont3() {
    this.methodcheck();
    return this.ischratlist = true;
  }

  Addproducts() {
    this.methodcheck();
    return this.isAddhospital = true;
  }

  Checkcustomer(): boolean {
    this.methodcheck();
    return this.isCustomerList = true;
  }

  Addcustomer() {
    this.methodcheck();
    return this.isAddcustomer = true;
  }

  Addinvice() {
    this.methodcheck();
    return this.isAdddepartment = true;
  }


  checkpeymont1() {
    this.methodcheck();
    return this.ispaymontinvice = true;
  }
  Addcustomers(){
    this.route.navigate(['Addcustomer']);
  }
  GoToListonvioce() {
    this.methodcheck();
    return this.ispaymont = true;
  }
  checkHome() {
    this.methodcheck();
    return this.ischeckhome = true;
  }
  checkpeymont2() {
    this.methodcheck();
    return this.ispaymontcredit = true;
  }
  checkrecipt() {
    this.methodcheck();
    return this.isrecipte = true;
  }
  CheckPatient(): boolean {
    this.methodcheck();

    return this.isPatientList = true;
  }
  Addproductss() {
    this.route.navigate(['Addproduct']);
  }
  AddPatient() {
    this.methodcheck();
    return this.isAddPatient = true;
  }
  checkinvioce(){
   this.ischeckhome=false
return this.isAllreport=true
  }
  checkrecipt1(){
    this.ischeckhome=false
    return this.isRecipt=true
  }
  checkproduct1(){
    this.ischeckhome=false
    return this.isproductslist=true
  }
  getInvice() {
    this.servicess.GetAllInices().subscribe((list: any) => {

      this.storedata = list.data;
      this.invoice = this.storedata.filter((x: any) => x.invoice_acceptance === 1)

      for (var pr of this.storedata) {
        this.num += 1
        this.price1+=pr.total_amount
      }

      //  this.storedata.filter((x:any)=>x. invoice_acceptance===1)

    }, (ex: any) => {
      console.log(ex);
    });
  }

  GetAllcustmer() {
    this.servicess.GetAllcustmers().subscribe((list: any) => {
      this.customers = list.data;

      for (var pr of this.customers) {
        this.num1 += 1

      }
    }, (ex: any) => {
      console.log(ex);

    });
  }

  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list: any) => {
      this.recipte = list.data;
      for (var pr of this.recipte) {
        this.num2 += 1
        this.price2+=pr.receipt_amount
      }
    }, (ex: any) => {
      console.log(ex);
    });
  }
  Getproducts() {
    this.servicess.GetAllproduct().subscribe((list: any) => {

      this.products = list.data;
      for (var pr of this.products) {
        this.num3 += 1

      }
    }, ex => {
      console.log(ex.error);

    });
  }
}

