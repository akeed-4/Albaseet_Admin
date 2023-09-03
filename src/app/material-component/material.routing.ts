import { Routes } from '@angular/router';



import { ControlRoleService } from '../control-role.service';

import { AddProductsComponent } from '../albaseet/add-products/add-products.component';
import { DetialsPaymontComponent } from '../albaseet/detials-paymont/detials-paymont.component';
import { FooterMenuComponent } from '../albaseet/footer-menu/footer-menu.component';
import { AbouteCompanyComponent } from '../albaseet/aboute-company/aboute-company.component';
import { AddCustomersComponent } from '../albaseet/add-customers/add-customers.component';
import { ConcetionCompanyComponent } from '../albaseet/concetion-company/concetion-company.component';
import { CustomerDeleletComponent } from '../albaseet/customer-delelet/customer-delelet.component';
import { ViewCustomer1Component } from '../albaseet/customer/view-customer1/view-customer1.component';
import { InviceComponent } from '../albaseet/invice/invice.component';
import { MySettingComponent } from '../albaseet/my-setting/my-setting.component';
import { ProductDeleteComponent } from '../albaseet/product-delete/product-delete.component';
import { PrograsLogoutComponent } from '../albaseet/progras-logout/progras-logout.component';
import { PymontComponent } from '../albaseet/pymont/pymont.component';
import { PaidCashInvoiceComponent } from '../albaseet/report_invioce/paid-cash-invoice/paid-cash-invoice.component';
import { ReportInvioceDateComponent } from '../albaseet/report_invioce/report-invioce-date/report-invioce-date.component';
import { UpdateProductComponent } from '../albaseet/update-product/update-product.component';
import { ViewCustomerComponent } from '../albaseet/view-customer/view-customer.component';
import { ViewProduct1Component } from '../albaseet/product/view-product1/view-product1.component';
import { ListPaymontMethodComponent } from '../albaseet/list-paymont-method/list-paymont-method.component';
import { ReportAllInvioceComponent } from '../albaseet/report_invioce-unapprove/report-all-invioce/report-all-invioce.component';
import { ReportAllReciptComponent } from '../albaseet/recipte/report-all-recipt/report-all-recipt.component';
import { ViewProductComponent } from '../albaseet/view-product/view-product.component';
import { AddPymentMethodComponent } from '../albaseet/add-pyment-method/add-pyment-method.component';


export const MaterialRoutes: Routes = [

  {path:'Addproduct/:id',component:AddProductsComponent},
  {path:'Addproduct',component:AddProductsComponent},

  {path:'detailspaymont',component:DetialsPaymontComponent},


  {path:'footer',component:FooterMenuComponent},
  {path:'Addcustomer/:id',component:AddCustomersComponent},
  {path:'Addcustomer',component:AddCustomersComponent},
  {path:'listcustomer',component:ViewCustomerComponent},
  {path:'updateproduct/:id',component:UpdateProductComponent},
  {path:'DeleteCustomer/:id',component:CustomerDeleletComponent},
  {path:'ProductDelet/:id',component:ProductDeleteComponent},
  {path:'view_customer1',component:ViewCustomer1Component},
  {path:'paid_cash',component:PaidCashInvoiceComponent},
  {path:'invice',component:InviceComponent},
  {path:'mysetting',component:MySettingComponent},
  {path:'AlBaseet_Abute',component:AbouteCompanyComponent},
  {path:'listproduct',component:ViewProductComponent},
  {path:'Contact_Us',component:ConcetionCompanyComponent},
  {path:'payment',component:PymontComponent},
  {path:'lsitpaymont',component:ListPaymontMethodComponent},
  {path:'Addpaymont',component:AddPymentMethodComponent},
  {path:'listReicept',component:ReportAllReciptComponent},

  {path:'reportinvioce',component:ReportAllInvioceComponent},
  {path:'logout',component:PrograsLogoutComponent},



];
