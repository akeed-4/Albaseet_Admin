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

@Component({
  selector: 'app-report-all-invioce',
  templateUrl: './report-all-invioce.component.html',
  styleUrls: ['./report-all-invioce.component.css']
})
export class ReportAllInvioceComponent {
  readonly allowedPageSizes = [5, 10,100, 'all'];
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
  constructor(private currentSettingService:CurrentSettingService,
    private router: Router, private fb: FormBuilder, private ListInvoices: ListInvoicesService,
    private servicess: MyservcesService, private exportPdfService: ExportPdfService, private languageService: LanguageService,
    private activeRoute: ActivatedRoute) {

    loadMessages(this.ListInvoices.getListInvoicesDictionary());
  }

  customer_aname: any;
  ngOnInit(): void {
    this.currentClickedId = 0
    this.showloading = false
    this.getAllinvioceUn()
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
    this.report = {
      enddate: new Date(),
      startdate: new Date()

    }


    this.productForm = this.fb.group({
      startdate: ['2022-07-01', Validators.required],
      enddate: ['2022-09-01', Validators.required],

    });

  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'Invioces', false);


    }

  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
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
console.log(  this.Invoiceheader)

      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    });
  }
  previewinvioc() {

    window.print()

  }




  sorting() {
    this.servicess.GetAllInices().subscribe((list: any) => {

      this.invoice = this.invoice


      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    });
  }

  getRowData(e: any) {

    this.currentClickedId = e.row.data.customer_id;

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



