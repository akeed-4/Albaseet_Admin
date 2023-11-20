import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { productdata } from '../../models/productdata';
import { products } from '../../models/products';
import { DxDataGridComponent } from 'devextreme-angular';
import { CurrentSettingService } from 'src/app/services/current-setting.service';
import { LanguageService } from '../../myservice/language.service';
import { formatMessage } from 'devextreme/localization';
import { ExportPdfService } from 'src/app/services/export-pdf.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report-product-unapprove',
  templateUrl: './report-product-unapprove.component.html',
  styleUrls: ['./report-product-unapprove.component.css']
})
export class ReportProductUnapproveComponent {
  @ViewChild(DxDataGridComponent, { static: false })dataGrid: DxDataGridComponent;
  havepdf: any
  displayMode = 'full';
  fontSize = this.currentSettingService.getUserGridFontSize();
  email: string;
  loadIndicatorVisible = false;
  rtlEnabled = this.languageService.getCurrentLanguage() == 'en' ? false : true;
  formatMessage = formatMessage;
  pagination = true;
  showloading: any;
  public showNavButtons = true;
  dataSource: any;
  loadingVisible: any
  public showInfo = true;
  storagdata: any[];
  public showPageSizeSelector = true;
  readonly allowedPageSizes = [5, 10,100, 'all'];
  currentClickedId: any;
  selsproducts:any[];
  constructor(
    private service: MyservcesService,private exportPdfService: ExportPdfService,
    private router: Router, private languageService: LanguageService, 
    private activeRoute: ActivatedRoute,private currentSettingService: CurrentSettingService,
  ) { }
  product_aname: any;
  productname: productdata
  products1: products
  productsss: any[];
  productss: any[]
  storageserch: any[]
  dtoptions: any = {};
  dtTrigger:Subject<any>=new Subject<any>();
  num: number;
  message: string;
  displayedColumns: string[] = ['products', 'total_amount', 'customer_aname', 'invoice_date'];
  dataSource1: MatTableDataSource<any>;

  ngOnInit(): void {
    
    this.storagdata=[]
    this.products1 = {
      available_quantity:0,
      new_item: 0,
      product_ename: '',
      product_id: '',
      product_aname: '',
      productsnameAr: '',
      productsnameEn: 'strin',
      product_image: '',
      quantity: 0,
      price: 0,

      description: ''

    }
    this.num = 0;
    this.storageserch = []
    this.productss = []
    this.product_aname = '';
    this.productsss = [];
    this.message = '';
    this.productname = {
      product_aname: ''
    }
    this.Getinvioces();
this.selsproducts=[]
    //this.hospitals = [];
  }
  
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  zoomIn() {
    document.getElementById('gridContainer')!.style.fontSize = ++this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }

  zoomOut() {
    document.getElementById('gridContainer')!.style.fontSize = --this.fontSize + 'px';
    localStorage.setItem('gridFontSize', this.fontSize.toString());
  }
  Addproduct() {
    this.router.navigate(['Addproducts']);
  }
  Getinvioces() {
    this.service.GetAllInices().subscribe((list: any) => {
      this.storagdata=list.data
      this.dataSource1=list.data
      for(let item of   this.storagdata){
         
          for(let items of item.products){
            this.selsproducts.push(items.product_data)
          }
      }
      if(this.selsproducts){
        this.showloading=true
      }
       
      
     console.log(  this.selsproducts)
    
      // this.productss = this.storagdata.filter((x:any)=> x.invoice_acceptance===0)
      
      this.dtTrigger.next(null);
    }, ex => {
      console.log(ex.error);
    });
  }
  Editproduct(id: string) {

    if (id) {
      this.router.navigate(['updateproduct', id]);
    }
  }
  Addproducts() {
    this.router.navigate(['Addproduct']);
  }
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
  DeleteConfirms(id: any) {
    if (id) {
      this.service.DeleteAllproducts(id).subscribe(x => {
        this.Getinvioces();
        $("#btnClose").trigger("click");
      }, ex => console.log(ex));

    }
  }
  DeleteConfirm() {
    var checkboxes = document.getElementsByClassName("ckitem");
    if (checkboxes.length > 0) {
      var ids = [];
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          var id = String($(checkboxes[i]).val());
          ids.push(id);
        }
      }

    }

  }

  getRowData(e: any) {

    this.currentClickedId = e.row.data.customer_id;

  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
    }
    if (e.format == 'pdf') {
      this.exportPdfService.exportPdfDataGrid(e, 'Customer list', false);
    }
  }
  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

  deleteproduct(ids: any) {
    this.service.Deleteproduct(ids).subscribe(_x => {
      console.log(ids)
      this.Getinvioces();
      console.log(_x)
    }, ex => console.log(ex));
  }


}








