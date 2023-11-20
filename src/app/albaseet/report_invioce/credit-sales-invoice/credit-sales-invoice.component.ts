import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../../models/invice';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { ListCusomerService } from 'src/app/services/list-cusomer.service';
import { listTotalUser } from '../../models/lsitTotalUser';
import { ListToTalUserService } from 'src/app/services/list-TotalUser.service';
import { LanguageService } from '../../myservice/language.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-credit-sales-invoice',
  templateUrl: './credit-sales-invoice.component.html',
  styleUrls: ['./credit-sales-invoice.component.css']
})
export class CreditSalesInvoiceComponent {
  showloading: any;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  productForm:FormGroup
  public showInfo = true;
  public showNavButtons = true;
  displayMode = 'full'
  fromDate: any;
  toDate: any;
  constructor( private exportExcelService : ExportExcelService,
    private router: Router,private datePipe: DatePipe,
    private servicess: MyservcesService,private spinnerService: NgxSpinnerService,
    private activeRoute: ActivatedRoute,private listTotalUser: ListToTalUserService, 
    private languageService: LanguageService,private exportPdfService: ExportPdfService,
    private fb: FormBuilder, private currentSettingService: CurrentSettingService
  ) { 
    loadMessages(this.listTotalUser.getListToTalUserDictionary());
  }
    price:any
   storedata:any;
   formatMessage = formatMessage;
  invoice: inivce[];
  invoice1: inivce[];
  fontSize = this.currentSettingService.getUserGridFontSize();
  approve: boolean;
  num: number;
  rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  invioce: inivce;
  message: string;
  dtoptions:any = {};
  dtTrigger:Subject<any>=new Subject<any>();
  customer_aname: any;
  ngOnInit(): void {
    this.showloading=false
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
    this.productForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
      
    });
  
    this. storedata='';
    this.approve = false;
    this.num = 0;
    this.customer_aname = '';
    this.invoice = [];
    this.invoice1 = []
    this.message = '';
this.price=0.0

    this.getinvioce();
  }
  onFromDateChanged(event: any) {
    this.fromDate = event.value;
    this.applyFilter();
  }
  
  onToDateChanged(event: any) {
    this.toDate = event.value;
    this.applyFilter();
  }
  
  applyFilter() {
    const filter = [];
    if (this.fromDate) {
      filter.push({ dataField: 'fieldName', operator: '>=', value: this.fromDate });
    }
    if (this.toDate) {
      filter.push({ dataField: 'fieldName', operator: '<=', value: this.toDate });
    }
  
    this.storedata.filter(filter);
  }
  
  generateReport() {
    const startDate = this.productForm.get('startDate').value;
    const endDate = this.productForm.get('endDate').value;
  const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedendtDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');
  if(formattedStartDate&& formattedendtDate){
    this.servicess.checkDateForm(formattedStartDate,formattedendtDate).subscribe((list:any)=>{
      this.storedata=[]
      this.storedata=list.data.transactions;
     
    },err=>{
      console.log(err)
    })
    // Make a request to a server to generate the report
  }
  }
  getinvioce() {
    this.servicess.GetAllTotalUser().subscribe((list: any) => {
      this.storedata=list.data.transactions;
   console.log(  this.storedata)
    
      for (var pr of  this.invoice) {
        this.price += pr.total_amount

      }
      if(   this.invoice ){
        this.showloading=true
      }

    }, (ex: any) => {
      console.log(ex);
    });
  }


  Addcustomer() {
    this.router.navigate(['Add-inivce']);
  }
  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }

  zoomOut() {
    document.getElementById('gridContainer')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
  checkinvioce() {

    return true
  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
      this.exportExcelService.exportExcelDataGrid(e, 'report', "report");
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'ToTallist', false);
    }
  }
  Editcustomer(id: number) {
    if (id) {


    }
  }


  // SelectAll() {
  //   var tbl = $('#tbl');
  //   var header = tbl.find('thead .ckheader');
  //   var item = tbl.find('tbody .ckitem');

  //   $(function () {
  //     item.on('change', function () {
  //       if ($(this).is(':checked')) {
  //         $(this).closest('tr').addClass('NewRowColor');
  //       }
  //       else {
  //         $(this).closest('tr').removeClass('NewRowColor');
  //       }
  //     });

  //     header.change(function () {

  //       var c = Boolean(this.checked);
  //       item.prop("checked", c);
  //       item.trigger('check');
  //       if ($(this).is(':checked')) {
  //         $(item).closest('tr').addClass('NewRowColor');
  //       }
  //       else {
  //         $(item).closest('tr').removeClass('NewRowColor');
  //       }
  //     });
  //   });
  // }

  IsDelete() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          return true;
        }
      }
    }
    return false;
  }

  DeleteCount() {
    var cont = $(".ckitem:checked").length;
    this.num = cont;
  }


  DeleteConfirm() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      var ids = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          var id = String($(checkboxes[i]).val());
          ids.push(id);
        }
      }

      this.servicess.DeletAllcustomer(ids).subscribe((s: any) => {
        console.log(s);
        this.getinvioce();
        $("#btnClose").trigger("click");
      }, (ex: any) => console.log(ex));
    }
  }
  sertch() {
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {

      this.invoice = this.invoice.filter(re => {
        return re.customer.customer_aname.toLocaleLowerCase().match(this.customer_aname.toLocaleLowerCase());
      })
    }

  }
 
}


