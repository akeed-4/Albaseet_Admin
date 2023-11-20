import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MyservcesService } from 'src/app/myservces.service';
import { approveinvice } from '../../models/approveinvice';
import { recipte } from '../../models/recipte';
import { reportinv } from '../../models/report';
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
import { DatePipe } from '@angular/common';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-dailly',
  templateUrl: './report-dailly.component.html',
  styleUrls: ['./report-dailly.component.css']
})
export class ReportDaillyComponent {
  displayedColumns = ['CustmerName', 'invioces', 'country', 'phone_Number', 'Tax', 'opretions'];
  productForm:FormGroup
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
  dataSources: any;
  storeuserid: any;

  constructor(    private fb: FormBuilder,private spinnerService: NgxSpinnerService,
      private exportExcelService : ExportExcelService,
    private service: MyservcesService, private translateService: TranslateService, private languageService: LanguageService, private exportPdfService: ExportPdfService,
    private router: Router, private listCustomer: ListCusomerService, private currentSettingService: CurrentSettingService,
    private activeRoute: ActivatedRoute, private auth: AuthoService,private datePipe: DatePipe
  ) {
    loadMessages(this.listCustomer.getListCustomerDictionary());
    this.Editcustomer = this.Editcustomer.bind(this)
    this.LoadCustomers()
  
  }

  ngOnInit() {
    this.spinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
    this.productForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
      
    });
    this.LoadUsers()
this.stores=[]
this. storeuserid=0
  this.showloading=false
    this.loadingVisible = false
    this.currentClickedId = 1
   this.LoadCustomers()
  }
  generateReport(){
    const startDate = this.productForm.get('startDate').value;
    const endDate = this.productForm.get('endDate').value;

  const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedendtDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');
  if(formattedStartDate&& formattedendtDate&&this.storeuserid){
    this.service.checkDateFormUser(this.storeuserid,formattedStartDate,formattedendtDate).subscribe((list:any)=>{
      this.dataSource=[]
    this.dataSource=list.data;
      console.log(  this.dataSource)
    },err=>{
      console.log(err)
    })
  }
  else{
    
  }
   
  }
 
 
  sendValue(e:any){
   this. storeuserid=e
   
    // this.service.GetToTalUser(e).subscribe( (res: any) => {
    //   this.dataSource = res.data;
      
    //   if(   this.dataSource ){
    //     this.showloading=true
    //   }
    //   this.dataGrid?.instance.endCustomLoading();
    // },err=>{
    //   alert( err.error)
    // });
  }
  grid:any
  LoadCustomers() {
  this.service.GetReportTransaction().subscribe( (res: any) => {
      this.dataSource = res.data;
      console.log(this.dataSource.total)
      if(   this.dataSource ){
        this.showloading=true
      }
      this.dataGrid?.instance.endCustomLoading();
    
    },err=>{
      alert( err.error)
    });
  }
  alert(){
    alert("kshbdfjhsbdjkfsd")
  }
  LoadUsers() {
    this.service.GetAllUser().subscribe( (res: any) => {
        this.dataSources = res.data;
       
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
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
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

