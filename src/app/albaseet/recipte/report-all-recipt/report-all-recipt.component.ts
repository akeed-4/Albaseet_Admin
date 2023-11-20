import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../../models/approveinvice';
import { recipte } from '../../models/recipte';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { LanguageService } from '../../myservice/language.service';
import { ListReceiptService } from 'src/app/services/list-receipt.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report-all-recipt',
  templateUrl: './report-all-recipt.component.html',
  styleUrls: ['./report-all-recipt.component.css']
})
export class ReportAllReciptComponent {
  price: number;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  placeholder = 'Search...';
  public showPageSizeSelector = true;
  public showInfo = true;
  fontSize = this.currentSettingService.getUserGridFontSize();
  public showNavButtons = true;
  havepdf: any
  showloading:any
  displayMode = 'full'
  formatMessage = formatMessage;
  currentClickedId: any;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  AllRecipte: any;
  constructor(private exportExcelService:ExportExcelService,
    private router: Router,
    private servicess: MyservcesService, private listReceipt: ListReceiptService,
    private currentSettingService:CurrentSettingService,
    private activeRoute: ActivatedRoute,private exportPdfService:ExportPdfService,private languageService: LanguageService,
private spinnerService: NgxSpinnerService,
  ) { 
    loadMessages(this.listReceipt.getListReceiptDictionary());
  }
  customer_aname:any
  aprove: approveinvice;
  storedata:any
  recipte: recipte [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;
  

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
    this.getrecipte();
    this.currentClickedId=0
 this.showloading=false
    this.storedata=[]
    this.customer_aname=''
  

  }

 
  onExporting(e) {
    if (e.format == 'xlsx') {
       this.exportExcelService.exportExcelDataGrid(e, 'reciept', "reciept");
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'ReceiptList', false);

    }

  }
  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list:any) => {
    this. AllRecipte = list.data;
 console.log( this. AllRecipte)
if(  this. AllRecipte ){
  this.showloading=true
}

    }, (ex: any) => {
      console.log(ex);
   
  })}

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


  DeleteCount() {
    var cont = $(".ckitem:checked").length;
    this.num = cont;
  }




}


