import { group } from '@angular/animations';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { keyboadShortCut } from 'src/app/albaseet/models/staticData.model';
import { AuthoService } from 'src/app/autho.service';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MyservcesService } from 'src/app/myservces.service';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { LanguageService } from 'src/app/services/language.service';
import { ListCusomerService } from 'src/app/services/list-cusomer.service';
import { Chart, registerables } from 'node_modules/chart.js';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { inivce } from 'src/app/albaseet/models/invice';
import { ListToTalUserService } from 'src/app/services/list-TotalUser.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';

Chart.register(...registerables)
@Component({
  selector: 'app-report-dailly',
  templateUrl: './report-dailly.component.html',
  styleUrls: ['./report-dailly.component.css'],
  standalone: true,
  imports: [DemoMaterialModule, NgFor,TranslateModule,NgIf,ReactiveFormsModule],
})
export class ReportDaillyComponent implements OnInit {
  showloading: any;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  productForm:FormGroup
  public showInfo = true;
  public showNavButtons = true;
  displayMode = 'full'
  constructor(private exportExcelService : ExportExcelService,
    private router: Router,private datePipe: DatePipe,
    private servicess: MyservcesService,
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
    this.servicess.GetAllTotalUsertoday().subscribe((list: any) => {
      this.storedata=list.data.transactions;
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


