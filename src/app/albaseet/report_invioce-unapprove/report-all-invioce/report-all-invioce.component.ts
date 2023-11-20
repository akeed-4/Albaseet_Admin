import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../../models/invice';
import { reportinv } from '../../models/report';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { ListInvoicesService } from 'src/app/services/list-invoices.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { LanguageService } from '../../myservice/language.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { data } from 'jquery';
import CustomStore from 'devextreme/data/custom_store';

import { SignalRService } from 'src/app/services/serviceSignalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-report-all-invioce',
  templateUrl: './report-all-invioce.component.html',
  styleUrls: ['./report-all-invioce.component.css']
})
export class ReportAllInvioceComponent {
  readonly allowedPageSizes = [5, 10, 100, 'all'];
  placeholder = 'serch'
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;
  havepdf: any
  displayMode = 'full';
  price: any
  labledata: any[]
  fontSize = this.currentSettingService.getUserGridFontSize();
  realdata: any[]
  count: number;
  count1: number
  storedata: any;
  productForm: FormGroup
  selectedMembers: inivce[]
  invoice: any[];
  invoice_date: any;
  invoice1: inivce[];
  report: reportinv;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  dtoptions: any = {};
  rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  dtTrigger: Subject<any> = new Subject<any>();
  Invoiceheader: any;
  formatMessage = formatMessage
  showloading: boolean;
  currentClickedId: any;
  product: any;
  methodToSubscribe = 'receiveinvoiceData';
  selsproduct: any[];
  connectionStarted: boolean;
  dataSource: CustomStore<any, any>;
  messageData: any;
  connectionState: string;
  signalRMessageDataCaller: any;
  signalRMessageDataContinuos: any;
  methodToCall = '';
  paramsBody = '';
  routePath = 'procedures';
  stronglyMethodToSubscribe = 'receiveinvoiceData';
  stores: any;
  constructor(private currentSettingService: CurrentSettingService, private exportExcelService : ExportExcelService,
    private router: Router, private fb: FormBuilder, private ListInvoices: ListInvoicesService,
    private servicess: MyservcesService, private exportPdfService: ExportPdfService, private languageService: LanguageService,
    private activeRoute: ActivatedRoute,private signalRService:SignalRService,
    private spinnerService: NgxSpinnerService) {

    loadMessages(this.ListInvoices.getListInvoicesDictionary());
    this.connectionStarted = false;
    // this.signalRService.signalRMessageData.subscribe(
    //   (data) => (this.messageData = data)
    // );
    // this.signalRService.connectionState.subscribe(
    //   (data) => (this.connectionState = data)
    // );
    // this.signalRService.signalRMessageDataCaller.subscribe(
    //   (data) => (this.signalRMessageDataCaller = data)
    // );
    this.signalRService.startRoutedSignalRConnection(this.routePath);
    this.signalRService.signalRMessageDataContinuos.subscribe(
      (data) => (this.signalRMessageDataContinuos = data)
     
    );
   
  
  }
  
  customer_aname: any;
  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
    // this.signalRService.addTransferChartDataListener();  
    // setTimeout(() => {
    //   this.signalRService.askServerListener("receiveinvoiceData");
    // }, 9000);
    
    this.getAllinvioceUn()
    this.selsproduct = []
    this.currentClickedId = 0
    this.showloading = false

   
    this.price = 0
    this.selectedMembers = []
    this.count = 0;
    this.invoice_date = ''
    this.count1 = 0;
    this.labledata = []
    this.customer_aname = ''
    this.realdata = []
    this.storedata = '';
    this.invoice = [];
    

  }
  
  onExporting(e) {
    if (e.format == 'xlsx') {
      this.exportExcelService.exportExcelDataGrid(e, 'invoices', "invoices");
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'InviocesList', false);
    }
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
  getDetailGridDataSource(product: any) {
    const rows = [{
      product_aname: product.product_aname,
      price: product.price,
    }];
    console.log(rows)
    return  rows;
  }
  zoomOut() {
    document.getElementById('gridContainer')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
  chnageDataTableMessageTop() {
    return '<h2 style=\'float: right\'>' + 'تقارير الفواتير  </h2>';
  }
  getAllinvioceUn() {
   
    this.servicess.GetAllInices().subscribe((list: any) => {
      this.Invoiceheader = list.data;

      if (this.Invoiceheader) {
        this.showloading = true
      }
      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex.error);
    });
  }
  previewinvioc() {

    window.print()

  }
  getRowData(e: any) {
    this.currentClickedId = e.row.data.customer_id
  }
  sertch() {
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {

      this.invoice = this.invoice.filter(re => {
        return re.customer.customer_aname?.toLocaleLowerCase().match(this.customer_aname?.toLocaleLowerCase());
      })
    }

  }
}
