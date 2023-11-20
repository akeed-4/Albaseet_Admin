import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../../models/invice';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { AuthoService } from 'src/app/autho.service';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { ListCusomerService } from 'src/app/services/list-cusomer.service';
import { keyboadShortCut } from '../../models/staticData.model';
import { LanguageService } from '../../myservice/language.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paid-cash-invoice',
  templateUrl: './paid-cash-invoice.component.html',
  styleUrls: ['./paid-cash-invoice.component.css']
})
export class PaidCashInvoiceComponent {

  displayedColumns = ['CustmerName', 'invioces', 'country', 'phone_Number', 'Tax', 'opretions'];

  placeholder = 'Search...';
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;
  @ViewChild(DxDataGridComponent, { static: false })dataGrid: DxDataGridComponent;
  havepdf: any
  displayMode = 'full';
  fontSize = this.currentSettingService.getUserGridFontSize();
  email: string;
  loadIndicatorVisible = false;
  rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  formatMessage = formatMessage;
  pagination = true;
  dataSource: any;
  loadingVisible: any



  currentClickedId: any;
  showloading: any;
  stores: any[];
  storess: any;

  constructor( private exportExcelService : ExportExcelService,
    private service: MyservcesService, private translateService: TranslateService, private languageService: LanguageService, private exportPdfService: ExportPdfService,
    private router: Router, private listCustomer: ListCusomerService, private currentSettingService: CurrentSettingService,
    private activeRoute: ActivatedRoute, private auth: AuthoService,  private spinnerService: NgxSpinnerService
  ) {
    loadMessages(this.listCustomer.getListCustomerDictionary());
    this.Editcustomer = this.Editcustomer.bind(this)
    this.Customerdelete = this.Customerdelete.bind(this)
    this.LoadCustomers()
  
  }

  ngOnInit() {
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
this.stores=[]
  this.showloading=false
    this.loadingVisible = false
    this.currentClickedId = 1
   this.LoadCustomers()
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }

  onHidden() {
    this.dataSource = this.dataSource;
  }

  showLoadPanel() {
    this.dataSource = {};
    this.loadingVisible = true;
  }
  Customerdelete(e: any) {
    if (Number(e)) {
      this.router.navigate(['DeleteCustomer', e.row.data.customer_id]);
    } else {
      var id = e.row.data.customer_id;
      e.event.preventDefault();

      this.router.navigate(['DeleteCustomer', id]);
    }

  }
  delet(e: any) {
    var invioce = 0;
    if (Number(e)) {
      invioce = e;
    } else {
      invioce = e.row.data.invoiceNo;
      e.event.preventDefault();

    }
  }
  addcustomer() {
    this.router.navigate(['Addcustomer']);
    // this.router.navigate(['Dashborad']);
  }
  grid:any
  LoadCustomers() {
  this.service.GetReportTransaction().subscribe( (res: any) => {
      this.dataSource = res.data;
   
      this.dataSource=res.data.transactions
 
      if(   this.dataSource ){
        this.showloading=true
      }
      this.dataGrid?.instance.endCustomLoading();
    

    },err=>{
      alert( err.error)
    });
  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      this.exportExcelService.exportExcelDataGrid(e,'report','report');
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'operations', false);
    }
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  Editcustomer(e: any) {
    if (Number(e)) {
      this.router.navigate(['Addcustomer', e.row.data.customer_id]);
    } else {
      var id = e.row.data.customer_id;
      e.event.preventDefault();

      this.router.navigate(['Addcustomer', id]);
    }

  }


  @HostListener('window:keydown.' + keyboadShortCut.addNew, ['$event'])
  createButton(event: KeyboardEvent) {
    event.preventDefault();
    this.router.navigate(['Addcustomer']);
  }

  @HostListener('window:keydown.' + keyboadShortCut.refrsh, ['$event'])
  refreshButton(event: KeyboardEvent) {
    event.preventDefault();
    this.dataGrid.instance.refresh();
  }

  @HostListener('window:keydown.' + keyboadShortCut.increaseFont, ['$event'])
  increaseFontButton(event: KeyboardEvent) {
    event.preventDefault();
    this.zoomIn();
  }

  @HostListener('window:keydown.' + keyboadShortCut.decreaseFont, ['$event'])
  decreaseFontButton(event: KeyboardEvent) {
    event.preventDefault();
    this.zoomOut();
  }

  @HostListener('window:keydown.' + keyboadShortCut.edit, ['$event'])
  editButton(event: KeyboardEvent) {
    event.preventDefault();

    this.router.navigate(['Addcustomer', this.currentClickedId]);
  }

  @HostListener('window:keydown.' + keyboadShortCut.delete, ['$event'])
  deleteButton(event: KeyboardEvent) {
    event.preventDefault();
    this.router.navigate(['DeleteCustomer', this.currentClickedId]);

  }
  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }

  zoomOut() {
    document.getElementById('gridContainer')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
 
}

