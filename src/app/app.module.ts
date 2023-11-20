import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { NgxPrintModule } from 'ngx-print';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { DxDataGridModule, DxButtonModule,DxSelectBoxModule, DxCheckBoxModule, DxNumberBoxModule, DxFormModule, DxAutocompleteModule, DxFormComponent, DxProgressBarModule, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { SpinnerComponent } from './shared/spinner.component';
import { LoginComponent } from './albaseetCars/login/login.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import  * as arMessages from "devextreme/localization/messages/ar.json";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';

import { SharedModule } from './shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JwtModule } from '@auth0/angular-jwt';
import { ProductDeleteComponent } from './albaseet/product-delete/product-delete.component';
import { ViewProduct1Component } from './albaseet/product/view-product1/view-product1.component';
import { PrograsLogoutComponent } from './albaseet/progras-logout/progras-logout.component';
import { PymontComponent } from './albaseet/pymont/pymont.component';
import { ReportAllReciptComponent } from './albaseet/recipte/report-all-recipt/report-all-recipt.component';
import { ReportCustomerReciptComponent } from './albaseet/recipte/report-customer-recipt/report-customer-recipt.component';
import { ReportDaillyComponent } from './albaseet/recipte/report-dailly/report-dailly.component';
import { ReportReciptDateComponent } from './albaseet/recipte/report-recipt-date/report-recipt-date.component';
import { ReciptAllComponent } from './albaseet/reciptun/recipt-all/recipt-all.component';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ReciptCustomerComponent } from './albaseet/reciptun/recipt-customer/recipt-customer.component';
import { ReciptDateViewComponent } from './albaseet/reciptun/recipt-date-view/recipt-date-view.component';
import { ReportAllInvioceVComponent } from './albaseet/report-all-invioce-v/report-all-invioce-v.component';
import { ReportInvioceMainComponent } from './albaseet/report-invioce-main/report-invioce-main.component';
import { ReportInvioceReturnedComponent } from './albaseet/report-invioce-returned/report-invioce-returned.component';
import { ReportInviocenotappReturnedComponent } from './albaseet/report-inviocenotapp-returned/report-inviocenotapp-returned.component';
import { ReportReciptMainComponent } from './albaseet/report-recipt-main/report-recipt-main.component';
import { ReportAllInvioceComponent } from './albaseet/report_invioce-unapprove/report-all-invioce/report-all-invioce.component';
import { ReportCashInviceComponent } from './albaseet/report_invioce-unapprove/report-cash-invice/report-cash-invice.component';
import { ReportCreditInvioceComponent } from './albaseet/report_invioce-unapprove/report-credit-invioce/report-credit-invioce.component';
import { ReportCustomerUnapproveComponent } from './albaseet/report_invioce-unapprove/report-customer-unapprove/report-customer-unapprove.component';
import { ReportDateInvoiceUnComponent } from './albaseet/report_invioce-unapprove/report-date-invoice-un/report-date-invoice-un.component';
import { ReportProductUnapproveComponent } from './albaseet/report_invioce-unapprove/report-product-unapprove/report-product-unapprove.component';
import { MatChipsModule } from '@angular/material/chips';

import { CreditSalesInvoiceComponent } from './albaseet/report_invioce/credit-sales-invoice/credit-sales-invoice.component';
import { PaidCashInvoiceComponent } from './albaseet/report_invioce/paid-cash-invoice/paid-cash-invoice.component';
import { ReportAllInvoiceComponent } from './albaseet/report_invioce/report-all-invoice/report-all-invoice.component';
import { ReportCustomerComponent } from './albaseet/report_invioce/report-customer/report-customer.component';
import { ReportDaitalsDateComponent } from './albaseet/report_invioce/report-daitals-date/report-daitals-date.component';
import { ReportInvioceDateComponent } from './albaseet/report_invioce/report-invioce-date/report-invioce-date.component';
import { ReportProductComponent } from './albaseet/report_invioce/report-product/report-product.component';
import { RequstComponent } from './albaseet/requst/requst.component';

import { AgGridModule } from 'ag-grid-angular';
import { SelectlanguageComponent } from './albaseet/selectlanguage/selectlanguage.component';
import { UpdateProductComponent } from './albaseet/update-product/update-product.component';
import { ViewCustomerComponent } from './albaseet/view-customer/view-customer.component';
import { ViewProductComponent } from './albaseet/view-product/view-product.component';
import { ViewRecipteComponent } from './albaseet/view-recipte/view-recipte.component';
import { AddProductsComponent } from './albaseet/add-products/add-products.component';
import { AddPymentMethodComponent } from './albaseet/add-pyment-method/add-pyment-method.component';
import { AddrequstComponent } from './albaseet/addrequst/addrequst.component';
import { AllRecieptVComponent } from './albaseet/all-reciept-v/all-reciept-v.component';
import { ConcetionCompanyComponent } from './albaseet/concetion-company/concetion-company.component';
import { CreateInvioceComponent } from './albaseet/create-invioce/create-invioce.component';
import { CreateReciptComponent } from './albaseet/create-recipt/create-recipt.component';
import { CustomerDeleletComponent } from './albaseet/customer-delelet/customer-delelet.component';
import { ViewCustomer1Component } from './albaseet/customer/view-customer1/view-customer1.component';
import { ViewCustomer2Component } from './albaseet/customer/view-customer2/view-customer2.component';
import { ViewCustomer3Component } from './albaseet/customer/view-customer3/view-customer3.component';
import { DashboraHomeComponent } from './albaseet/dashbora-home/dashbora-home.component';
import { ListPaymontMethodComponent } from './albaseet/list-paymont-method/list-paymont-method.component';
import { MainInvoicereportENComponent } from './albaseet/main-invoicereport-en/main-invoicereport-en.component';
import { MainRecipterportENComponent } from './albaseet/main-recipterport-en/main-recipterport-en.component';
import { MySettingComponent } from './albaseet/my-setting/my-setting.component';
import { InviceComponent } from './albaseet/invice/invice.component';
import { MatCardModule } from '@angular/material/card';
import { AddCustomersComponent } from './albaseet/add-customers/add-customers.component';
import { DetialsPaymontComponent } from './albaseet/detials-paymont/detials-paymont.component';
import { 
	IgxAvatarModule,
	
	IgxSwitchModule,
	IgxExcelExporterService,
	IgxCsvExporterService,
	IgxInputGroupModule
 } from "igniteui-angular";
 
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { IgxGridModule } from 'igniteui-angular';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { AuthInterceptor, OidcSecurityService } from 'angular-auth-oidc-client';
import { loadMessages, locale } from 'devextreme/localization';
import { MomentUtcDateAdapter } from './albaseet/models/modells/moment-utc-date-adpater';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, matDialogAnimations } from '@angular/material/dialog';
import { DisplayErrorsComponent } from './display-errors/display-errors.component';
import { SpinnerService } from './services/spinner.service';
import { FormfiltingComponent } from './albaseet/formfilting/formfilting.component';

export function tokenGetter() {
  return localStorage.getItem("token");

}

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    LoginComponent,

RequstComponent,
AddrequstComponent,
InviceComponent,
PymontComponent,
DashboraHomeComponent,
DetialsPaymontComponent,
DisplayErrorsComponent,
ViewCustomerComponent,
      ViewProductComponent,
     
   AddProductsComponent,
PaidCashInvoiceComponent,
    ReportAllInvoiceComponent,
    UpdateProductComponent,
      ViewRecipteComponent,
      ViewCustomer1Component,
      ViewCustomer2Component,
      ViewCustomer3Component,
      ViewProduct1Component,
      CreditSalesInvoiceComponent,
   AddPymentMethodComponent,
   ConcetionCompanyComponent,
   ReportCustomerComponent,
  ReportInvioceDateComponent,
   PaidCashInvoiceComponent,
   CreditSalesInvoiceComponent,
   ReportAllInvoiceComponent,
   ReportInvioceDateComponent,
   ReportReciptDateComponent,
   ReportProductComponent,
   ReportInvioceMainComponent,
   ReportReciptMainComponent,
   PrograsLogoutComponent,
   ReportAllReciptComponent,
   ReportCustomerReciptComponent,
   CreateInvioceComponent,
   CreateReciptComponent,
   ReportCashInviceComponent,
   ReportCreditInvioceComponent,
   ReportCustomerUnapproveComponent,
   ReportProductUnapproveComponent,
   ReportAllInvioceComponent,
   ReportDateInvoiceUnComponent,
   SelectlanguageComponent,
   ReciptAllComponent,
   ReciptCustomerComponent,
   ReciptDateViewComponent,
   MainInvoicereportENComponent,
   MainRecipterportENComponent,
   ReportDaitalsDateComponent,
   ReportDaillyComponent,
   ReportAllInvioceVComponent,
   AllRecieptVComponent,
   ReportInvioceReturnedComponent,
   ReportInviocenotappReturnedComponent,
   ListPaymontMethodComponent,
   CustomerDeleletComponent,
   ProductDeleteComponent,
   AddCustomersComponent,
   FormfiltingComponent,
   
  ],
  imports: [
    MatCardModule,
    FormsModule,
    MatChipsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatTableModule,
    MatGridListModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule,
    HttpClientModule,
    IgxAvatarModule,
	  DxSelectBoxModule,
    IgxSwitchModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxButtonModule,
    DxFormModule,
    DxAutocompleteModule,
    DxProgressBarModule,
     DxButtonModule,
    IgxInputGroupModule,
    SharedModule,
    
    NgxPrintModule,
    MatSnackBarModule,
    AgGridModule,
    
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    MatTableModule,
    MatDatepickerModule,
    ToastrModule.forRoot(),
    MatSortModule,
    IgxGridModule,
    DxDrawerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["baseet.selfip.com:8096"],
        disallowedRoutes: []
      }
  }),
    ToastrModule.forRoot(),
    GuiGridModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    TranslateModule.forRoot({
      defaultLanguage : "en",
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
   
    MatInputModule
  ],
 
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }, provideToastr(),
   
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DatePipe },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  localLanguage! :string;
  constructor() {
    loadMessages(arMessages.default);
    this.getLocalLang();
    locale(this.localLanguage);
}
getLocalLang(){
  this.localLanguage = localStorage.getItem('currentLanguage') || 'ar';
}}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http,'../assets/i18n/','.json');
}
// mobweb.eofficewebapp.com