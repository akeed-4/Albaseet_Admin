import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DevExtremeModule, DxDataGridComponent } from 'devextreme-angular';
import { formatMessage, loadMessages } from 'devextreme/localization';

import { keyboadShortCut } from 'src/app/albaseet/models/staticData.model';
import { AuthoService } from 'src/app/autho.service';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MyservcesService } from 'src/app/myservces.service';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { LanguageService } from 'src/app/services/language.service';
import { ListCusomerService } from 'src/app/services/list-cusomer.service';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [DemoMaterialModule, NgFor,TranslateModule,NgIf,DevExtremeModule],
  styleUrls: ['./card.component.scss']
})

export class CardComponent {
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



  private baseUrl = "http://app.eofficewebapp.com/";
  currentClickedId: any;
  showloading: any;

  constructor(private exportExcelService : ExportExcelService,
    private service: MyservcesService, private translateService: TranslateService, private languageService: LanguageService, private exportPdfService: ExportPdfService,
    private router: Router, private listCustomer: ListCusomerService, private currentSettingService: CurrentSettingService,
    private activeRoute: ActivatedRoute, private auth: AuthoService
  ) {
    loadMessages(this.listCustomer.getListCustomerDictionary());
  
  }

  ngOnInit() {

  this.showloading=false
    this.loadingVisible = false
    this.currentClickedId = 1
    this.LoadCustomers()
  }


  LoadCustomers() {
  this.service.GetAllcustmers().subscribe( (res: any) => {
      this.dataSource = res.data;
      this.dataSource = res.data.filter((x:any)=> x.invoices_count>0 )
    });
  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      this.exportExcelService.exportExcelDataGrid(e, 'report', "report");
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'Customer list', false);
    }
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
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
    document.getElementById('gridContainerid')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }

  zoomOut() {
    document.getElementById('gridContainerid')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
 
}

