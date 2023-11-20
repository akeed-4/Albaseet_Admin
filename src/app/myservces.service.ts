import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contains } from 'jquery';
import { Observable } from 'rxjs/internal/Observable';
import { approveinvice } from './albaseet/models/approveinvice';
import { customer } from './albaseet/models/customers';
import { inivce } from './albaseet/models/invice';
import { AddPurches_invioce } from './albaseet/models/modells/AddPurches_invioce';
import { BrunchCars } from './albaseet/models/modells/BrunchCars';
import { Carcolor } from './albaseet/models/modells/Carcolor';
import { GetCarsVareint } from './albaseet/models/modells/GetCarsVareint';
import { GettNameclass } from './albaseet/models/modells/GetNameclass';
import { Gettypebrunch } from './albaseet/models/modells/Gettypebrunch';
import { modelcar } from './albaseet/models/modells/ModelCar';
import { Rigestar } from './albaseet/models/modells/Registar';
import { registarcar } from './albaseet/models/modells/RegistarCar';
import { Typecar } from './albaseet/models/modells/Typecar';
import { Classcars } from './albaseet/models/modells/classcars';
import { payment_method } from './albaseet/models/payment_method';
import { post } from './albaseet/models/post';
import { products } from './albaseet/models/products';
import { recipte } from './albaseet/models/recipte';
import { request } from './albaseet/models/request';





@Injectable({
  providedIn: 'root'
})
export class MyservcesService {
  [x: string]: any;
  // private baseUrl = "http://localhost:5000/";
  
  private baseUrl="http://baseet.selfip.com:8096/"
  private baseUr2= "https://localhost:44377/CarsControler/";
  private basurl3="https://localhost:44377/Invoice/";
  private basurl4="https://localhost:44377/Purchase_invoices/";
  private basurl5="https://localhost:44377/Admin/";
  private UrlReport="https://localhost:44377/Report/";
  private UrlshowRoom="https://localhost:44377/ShowRoom/";
  
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': (localStorage.getItem('currentLanguage') || 'en'),
    }),
 //   withCredentials: true,
  };
  constructor(private http: HttpClient) { }

  //datails product 
  Addproduct(formData: FormData) {
 
    return this.http.post(this.baseUrl + 'product/create', formData,).pipe();
  }
  AddproductMod(formData: products) {

    return this.http.post<products>(this.baseUrl + 'product/create', formData).pipe();
  }
  Editproduct(formData: products) {
  
    return this.http.post(this.baseUrl + 'product/update', formData, ).pipe();
  }

  GetAllpayment(): Observable<customer[]> {
   
    return this.http.get<customer[]>(this.baseUrl + 'payments/get_payments', this.headers).pipe();
  }
  GetAllpaymentbyid(id :any): Observable<any[]>{
    return this.http.get<customer[]>(this.baseUrl + 'payments/get_payments/' + id, this.headers).pipe();
  }
  Getproduct(id: number): Observable<products> {
    return this.http.get<products>(this.baseUrl + 'product/get_warehouse_products/' + id, this.headers).pipe();
  }

  GetAllproduct(page:number): Observable<products[]> {
 
    return this.http.get<products[]>(this.baseUrl + 'product/get_products/'+page, this.headers).pipe();
  }
  
 
  DeleteAllproducts(ids: any): Observable<products> {
  console.log(ids)
    return this.http.post<products>(this.baseUrl + 'product/delete' + ids, this.headers).pipe();
  }

  Deleteproduct(ids: string): Observable<products> {
  
    return this.http.post<products>(this.baseUrl + 'product/delete/'+ ids, this.headers).pipe();
  }

  GetAllUser(): Observable<any> {
 
    return this.http.get<any>(this.baseUrl + 'reports/GetAllUsers' , this.headers).pipe();
  }

  GetToTalUser(userId:any): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'reports/GetTotalUserId/'+userId , this.headers).pipe();
  }

//details customers

  Getcustomer(id: number): Observable<customer> {
 
    return this.http.get<customer>(this.baseUrl + 'customers/get_customers/' + id, this.headers).pipe();
  }

  GetAllcustmers(): Observable<customer[]> {
   
    return this.http.get<customer[]>(this.baseUrl + 'customers/get_customers', this.headers).pipe();
  }
  GetReportTransaction(): Observable<any[]> {
   
    return this.http.get<any[]>(this.baseUrl + 'reports/Webget_transaction', this.headers).pipe();
  }

  Addcustomermodel(formData: customer) {
    
    return this.http.post<customer>(this.baseUrl + 'customers/create', formData).pipe();
  }
  Editcustomer(formData: customer) {
  
    return this.http.post<customer>(this.baseUrl + 'customers/update', formData).pipe();
  }


  DeletAllcustomer(ids: any): Observable<customer> {
   console.log(ids)
    return this.http.post<customer>(this.baseUrl + 'customers/delete/'+ids, this.headers).pipe();
  }



  GetAllrecipte(): Observable<recipte[]> {
   
    return this.http.get<recipte[]>(this.baseUrl + 'receipts/Webget_receipts', this.headers).pipe();
  }

  approverecipte(id: approveinvice){
    console.log(id)
     return this.http.post<approveinvice>(this.baseUrl + 'receipts/approve',id).pipe();
    
    }
    

  
  postRequset(id: number): Observable<request> {
    return this.http.get<request>(this.baseUrl + '/GetDoctor/' + id, this.headers).pipe();
  }
  Getinvices(id: number): Observable<inivce> {
    return this.http.get<inivce>(this.baseUrl + '/GetDoctor/' + id, this.headers).pipe();
  }

  GetAllInices(): Observable<inivce[]> {
    return this.http.get<inivce[]>(this.baseUrl + 'invoices/Webget_invoices', this.headers).pipe();
  }
  GetAllTotalUser(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'reports/Webget_transactionUser', this.headers).pipe();
  }
  GetAllTotalUsertoday(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'reports/Webget_transactionUsertoday', this.headers).pipe();
  }
  checkDateForm(start:any,end:any) {
  
    return this.http.get<any[]>(this.baseUrl + 'reports/Webget_transactionUserDate/'+ start + '/' + end).pipe();
  }
  checkDateFormUser(userid:any,start:any,end:any) {
  
    return this.http.get<any[]>(this.baseUrl + 'reports/GetTotalUser/'+userid+'/'+ start + '/' + end).pipe();
  }


  
approveInvioce(id: approveinvice){
console.log(id)
 return this.http.post<approveinvice>(this.baseUrl + 'invoices/approve',id).pipe();

}




  AddRequest(formData: FormData) {
    console.log(formData);
    return this.http.post(this.baseUrl + '/AddDoctor', formData).pipe();
  }

  Addinvice(formData: FormData) {
    console.log(formData);
    return this.http.post(this.baseUrl + '/Addinvice', formData, { withCredentials: true }).pipe();
  }



  AddpaymentMethod(formData: payment_method) {
    console.log(formData);
    return this.http.post<payment_method>(this.baseUrl + 'payments/create', formData).pipe();
  }
  EditPaymont(formData: payment_method){
    console.log(formData)
    return this.http.post<payment_method>(this.baseUrl + 'payments/update', formData).pipe();
  }
  Deletpaymont(id:any){
    console.log(id)
    return this.http.post<any>(this.baseUrl + 'payments/delete/'+id, this.headers).pipe();
  }
//هنا التسجيل واضافه بيانات سيارة
AddCarcolors(formData: any): Observable<Carcolor> {
  console.log(formData)
  return this.http.post<Carcolor>(this.baseUr2 + 'Addcarcolor', formData,this.headers).pipe();
}
AddCarclass(formData: any): Observable<Classcars> {
  console.log(formData)
  return this.http.post<Classcars>(this.baseUr2 + 'AddcatgoryCars', formData,this.headers).pipe();
}
AddCars(formData: any) {
  console.log(formData)
  return this.http.post<registarcar>(this.baseUr2 + 'AddCarsverant', formData).pipe();
}














GetAllproductBuy(): Observable<any[]> {
   
  return this.http.get<any[]>(this.baseUr2 + 'GetAllproductBuy', this.headers).pipe();
}




  Register(reg : Rigestar): Observable<Rigestar>{
    console.log(reg)
    return this.http.post<Rigestar>(this.baseUrl +'Register' ,reg,this.headers).pipe();

  }
  
  GatAllcustomer(): Observable<any[]> {
   
    return this.http.get<any[]>(this.baseUr2 + 'GetAllCustomers',this.headers).pipe();
  }


  GatAllCarsBus(): Observable<any[]> {
   
    return this.http.get<any[]>(this.UrlReport + 'GetAllCCarsPurchase',this.headers).pipe();
  }



 




//testin only

 
  Addppost(formData: post) {
    console.log(formData);
    return this.http.post<post>(this.baseUrl + '/posts', formData, { withCredentials: true }).pipe();
  }
  updateppost(formData: post) {
    console.log(formData);
    return this.http.put<post>(this.baseUrl + '/posts/1', formData, { withCredentials: true }).pipe();
  }
  getCars(){
   
    return this.http.put<post>(this.baseUrl + '/posts/1', { withCredentials: true }).pipe();
  }


  GetCustomer() {
    return this.http.get('https://localhost:7118/Customer/GetAll');
  }
  GetCustomerbycode(code: any) {
    return this.http.get('https://localhost:7118/Customer/GetByCode?Code='+code);
  }
  GetProducts() {
    return this.http.get('https://localhost:7118/Product/GetAll');
  }
  GetProductbycode(code: any) {
    return this.http.get('GetItem'+code);
  }
  GetnumberInvioce() {
    return this.http.get(this.baseUr2 + 'GetItem');
  }
  GetnumberInvioceBuy() {
    return this.http.get(this.baseUr2 + 'GetNumberinvioc');
  }
  GetAllInvoice(){
    return this.http.get(this.basurl3+'GetAllHeader');
  }
  GetAllInvoiceBuy(){
    return this.http.get(this.basurl4+'GetAllHeader');
  }
  GetInvHeaderbycode(invoiceno:any){
    return this.http.get(this.basurl4+'GetAllHeaderbyCode/'+invoiceno,this.headers);
  }
  GetInvDetailsbycode(invoiceno:any){
    return this.http.get(this.basurl4+'GetAllDetailbyCode/'+invoiceno,this.headers);
  }
  GetInvDetailbycode(invoiceno:any){
    return this.http.get( this.basurl3+'GetAllDetailbyCode/',invoiceno);
  }
  RemoveInvoice(invoiceno:any){
    return this.http.delete( this.basurl4+'Remove/'+invoiceno,this.headers).pipe();
  }

  SaveInvoice(invoicedata:any){
    console.log(invoicedata)
    return this.http.post(this.basurl3 + 'Save',invoicedata);
  }
  SaveBuyInvoice(invoicedata:any){
    console.log(invoicedata)
    return this.http.post(this.basurl4 + 'Save',invoicedata);
  }

  GenerateInvoicePDF(invoiceno:any){
    return this.http.get(this.basurl3 +'generatepdf/'+invoiceno,{observe:'response',responseType:'blob'})
    
  }

  GenerateInvoiceBuyPDF(invoiceno:any){
    return this.http.get(this.basurl4 +'generatepdf/'+invoiceno,{observe:'response',responseType:'blob'  })
    
  }
SaveReciept(depositDAta:any){
  console.log(depositDAta)
    return this.http.post(this.basurl5 +'Bond_depositAdd',depositDAta)
    
  }
  Savewarhouse(depositDAta:any){
    console.log(depositDAta)
      return this.http.post(this.basurl5 +'Addwarehouse',depositDAta).pipe()
      
    }
    GetAllshowRoom(): Observable<any[]> {
      return this.http.get<any[]>(this.basurl5 + 'GetAllShowroom', this.headers).pipe();
    }
    getAllRoll(){
      return this.http.get<any[]>(this.basurl5 + 'GetAllRoles', this.headers).pipe();
    }
    AddpermationRo(data:any){
      return this.http.post<any[]>(this.basurl5 + 'AddPeremationRoll',data, this.headers).pipe();
    }

    getAllVarnit(){
      return this.http.get<any[]>(this.baseUr2 + 'GetAllCarVarint', this.headers).pipe();
    }
}

//  private baseUrl = "https://mobweb.eofficewebapp.com/";


