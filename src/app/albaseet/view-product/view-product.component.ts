import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { products } from '../models/products';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthoService } from 'src/app/autho.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { lsitproduct } from '../models/ListProduct';
import { lstproductService } from 'src/app/service/listprodcut';
import { LanguageService } from '../myservice/language.service';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { keyboadShortCut } from '../models/staticData.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { CurrentSettingService } from 'src/app/services/current-setting.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent {
  displayedColumns = ['product_aname','product_ename','price','opretions'];
  dataSource!:any;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  placeholder = 'Search...';
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;
  private baseUrl = "http://app.eofficewebapp.com/";
  havepdf: any
  rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  displayMode = 'full';
  

  formatMessage = formatMessage;
  Invoiceheader: any;
  fontSize = this.currentSettingService.getUserGridFontSize();
  locale: any;
  currentClickedId: any;
  showloading: boolean;
  constructor(
    private service: MyservcesService,  private currentSettingService:CurrentSettingService,
    private router: Router,  private languageService: LanguageService, private exportPdfService:ExportPdfService,
    private activeRoute: ActivatedRoute,private auth:AuthoService, private productservice:lstproductService
  ) { 
   
    loadMessages(this.productservice.getListprodcutDictionary());
    this.Editproduct=this.Editproduct.bind(this)
    this.deleteproduct=this.deleteproduct.bind(this)
    this.Loadproduct()
  }



 
  ngOnInit() {
    this.showloading=false
    this.currentClickedId=0
    
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }
  addpurches(){
    this.router.navigate(['Addproduct']);
    // this.router.navigate(['Dashborad']);
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
  Loadproduct() {
    this.service.GetAllproduct().subscribe((response:any) =>{
      this.Invoiceheader=response.data
    
  if( this.Invoiceheader){
    this.showloading=true
  }
      console.log( this.Invoiceheader)
    });
  }
  Editproduct(e: any) {
    if(Number(e)){
      this.router.navigate(['updateproduct', e.row.data.product_id]);
    }else{
      var id = e.row.data.product_id;
      e.event.preventDefault();
      this.router.navigate(['updateproduct', id]);
    }
        
      }

  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
    }
    if (e.format == 'pdf') {
       this.exportPdfService.exportPdfDataGrid(e, 'purches', false);


    }

  }
  deleteproduct(e: any) {
    if((e)){
      this.router.navigate(['ProductDelet', e.row.data.product_id]);
    }else{
      var id = e.row.data.product_id;
      e.event.preventDefault();
      this.router.navigate(['ProductDelet', id]);
    }
   
  }
  
  @HostListener('window:keydown.' + keyboadShortCut.addNew, ['$event'])
  createButton(event: KeyboardEvent) {
    event.preventDefault();
    this.router.navigate(['Addproduct']);
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

    this.router.navigate(['updateproduct', this.currentClickedId]);
  }

  @HostListener('window:keydown.' + keyboadShortCut.delete, ['$event'])
  deleteButton(event: KeyboardEvent) {
    event.preventDefault();
    this.router.navigate(['ProductDelet', this.currentClickedId]);
    
  }
  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }

  zoomOut() {
    document.getElementById('gridContainer')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
  getRowData(e:any){
  
    this.currentClickedId = e.row.data.product_id;
 
  }
}
