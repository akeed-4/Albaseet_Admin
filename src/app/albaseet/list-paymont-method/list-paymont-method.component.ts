import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { customer } from '../models/customers';
import { formatMessage, loadMessages } from 'devextreme/localization';
import { lstproductService } from 'src/app/service/listprodcut';
import { ListPaymontService } from 'src/app/services/list-paymont.service';
import { keyboadShortCut } from '../models/staticData.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { CurrentSettingService } from 'src/app/services/current-setting.service';

@Component({
  selector: 'app-list-paymont-method',
  templateUrl: './list-paymont-method.component.html',
  styleUrls: ['./list-paymont-method.component.css']
})
export class ListPaymontMethodComponent {
  readonly allowedPageSizes = [5, 10, 'all'];
  placeholder = 'Search...';
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;
  havepdf: any
  displayMode = 'full';
  num1: number;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  isactive: boolean;
  formatMessage = formatMessage;
  showloading:any
  currentClickedId: any;
  constructor(
    private router: Router,
    private servicess: MyservcesService, private listpaymont:ListPaymontService,
    private activeRoute: ActivatedRoute,private fb: FormBuilder,private currentSettingService:CurrentSettingService,

  ) {
    loadMessages(this.listpaymont.getListCustomerDictionary());

   }
  id:any
  p: number ;
  customer_aname:any;
  btnTitle:string
  isloading:boolean;

  productForm:FormGroup
  customers: customer [];
  reverseArray:any[]
  customer:customer;
  //doctor: AddDoctorModel;
  num: number;
  message: string;

  dtoptions:any = {};
  fontSize = this.currentSettingService.getUserGridFontSize();
  Invoiceheader:any
  dtTrigger:Subject<any>=new Subject<any>();
  ngOnInit(): void {
    this.showloading=false
 
    this.id=0;
    this.num1=0
    this.customer_aname='',
    this.customer={
      customer_id: 0,
      customernameRr: '',
      customer_aname:'',
    
      customer_ename: '',
      customer_address: '',
      customer_country:'',
      customer_city: '',
    
      customer_state:'',
      customer_mobile: '',
      invoices_count:0
,      receipts_amount:0,
      customer_postcode:'',
      customer_taxid:0,
      user_id:0

    }
    
    this.isloading=false
    this.productForm=this.fb.group({
      title: ['', Validators.required],
     
      body:['', Validators.required],
    
     
    });
    this.num = 0;
    this.btnTitle = 'اضافة';
    this.customers = [];
    this.message = '';
    

    this.GetAllPayment1();
  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
    }
    if (e.format == 'pdf') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);


    }

  }
  addpaymont(){
    this.router.navigate(['Addpaymont']);
  }
  GetAllPayment1() {
    this.servicess.GetAllpayment().subscribe((list:any) => {
      this.Invoiceheader= list.data;
      this.Invoiceheader= this.Invoiceheader .filter((x: any) => x.customer_aname !== null)
      if (this.Invoiceheader) {
        this.showloading = true
      }
     
    }, (ex: any) => {
      console.log(ex);
   
    });
  }
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }
  Addcustomer(){
    this.router.navigate(['Addcustomer']);
  }
  ValidateModel() {
    this.customer.customer_address=this.productForm.value.title
    this.customer.customer_aname = this.productForm.value.title;
    this.customer.customer_city=this.productForm.value.title
    this.customer.customer_country = this.productForm.value.title;
    this.customer.customer_id=this.productForm.value.title
    this.customer.customer_mobile = this.productForm.value.title;
    this.customer.customer_state=this.productForm.value.title
    this.customer.customernameRr = this.productForm.value.title;
    this.customer.customer_ename=this.productForm.value.title
    this.customer.invoices_count = this.productForm.value.title;
    
  }
  sorting() {
    
    this.servicess.GetAllcustmers().subscribe((list: any) => {

      this.customers = this.customers.reverse()
     

      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    });
  }
  Editcustomer(id: number) {
    if (id) {
      this.router.navigate(['Addcustomer',id]);
    }

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

  DeleteCount() {
    var cont = $(".ckitem:checked").length;
    this.num = cont;
  }

  DeleteConfirm() {

      this.servicess.DeletAllcustomer(this.id).subscribe((s: any) => {
     this.message=s.message.ar;
     
    
        this.GetAllPayment1();
        this.id=0;
       
      }, (ex: any) => console.log(ex));
  }
  sertch(){
    this.isactive=true;
    if(this.customer_aname==''){
      this.ngOnInit() }
    else{
      this.customers=this.customers.filter(re=>{
          return re.customer_aname.toLocaleLowerCase().match(this.customer_aname.toLocaleLowerCase());
      })
    }

  }
  Delete1(id:any){
this.id=id;
 
   }
   
   @HostListener('window:keydown.' + keyboadShortCut.addNew, ['$event'])
   createButton(event: KeyboardEvent) {
     event.preventDefault();
     this.router.navigate(['Addpaymont']);
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
   getRowData(e:any){
   
     this.currentClickedId = e.row.data.customer_id;
  
   }
}

