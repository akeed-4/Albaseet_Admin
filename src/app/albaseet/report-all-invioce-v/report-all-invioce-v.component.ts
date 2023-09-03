import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../models/invice';
import { reportinv } from '../models/report';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthoService } from 'src/app/autho.service';

@Component({
  selector: 'app-report-all-invioce-v',
  templateUrl: './report-all-invioce-v.component.html',
  styleUrls: ['./report-all-invioce-v.component.css']
})
export class ReportAllInvioceVComponent {
  displayedColumns = ['invoice_no','customer_aname','customer_address','invoice_date','total_amount','paid_amount','tax_amount','amount_before_tax','invoice state'];
  dataSource!:MatTableDataSource<any>;
  readonly allowedPageSizes = [5, 10, 'all'];
  placeholder='serch'
  public showPageSizeSelector = true;
  public showInfo = true;
  public showNavButtons = true;
  havepdf: any
  displayMode = 'full';
  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;
  Invoiceheader: any;
  constructor(
    private service: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute,private auth:AuthoService
  ) { }
  
  ngOnInit() {
    this.service.GetAllInices().subscribe((response:any) =>{
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }
  
  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }
  addpurches(){
    this.router.navigate(['Addcustomer']);
    // this.router.navigate(['Dashborad']);
  }
  
  LoadInvoice() {
    this.service.GetAllInvoiceBuy().subscribe((res: any) => {
      this.Invoiceheader = res;
  
      console.log( this.Invoiceheader)
    });
  }
  onExporting(e) {
    if (e.format == 'xlsx') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);
    }
    if (e.format == 'pdf') {
      // this.exportPdfService.exportPdfDataGrid(e, 'purches', false);


    }

  }
  IsSales() {
    console.log(this.auth.role)
    var user = !!localStorage.getItem('role');
  
    if (user) {
      const role=localStorage.getItem('role')
      if (role == 'Sales')
        return true;
    }
    return false
  }
  IsAdmin() {
    var isAdmin = !!localStorage.getItem('role');
  
    if (isAdmin) {
      const role=localStorage.getItem('role')
      if (role == "Admin") {
  
        return true;
      }
    }
    return false;
  }
  Issupervisor() {
    var isAdmin = !!localStorage.getItem('role');
  
    if (isAdmin) {
      const role=localStorage.getItem('role')
      if (role == "supervisor") {
  
        return true;
      }
    }
    return false;
  }
  invoiceremove(invoiceno: any) {
    if (confirm('Do you want to remove this Invoice :' + invoiceno)) {
      this.service.RemoveInvoice(invoiceno).subscribe((res: any) => {
        let result: any;
        result = res;
        if (result.result == 'pass') {
          alert('Removed Successfully.')
          this.LoadInvoice();
        } else {
          alert('Failed to Remove.');
        }
      });
    }
  }
  
  Editinvoice(invoiceno: any) {
    this.router.navigateByUrl('AddPurchase_invoices/' + invoiceno);
  
  }
  PrintInvoice(invoiceno: any) {
    this.service.GenerateInvoiceBuyPDF(invoiceno).subscribe((res: any) => {
      let blob = res.body ;
      let url = window.URL.createObjectURL(blob);
       window.open(url);
  
   
    });
  }
  DownloadInvoice(invoiceno: any) {
    this.service.GenerateInvoiceBuyPDF(invoiceno).subscribe((res: any) => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
  
      let a = document.createElement('a');
      a.download = invoiceno;
      a.href = url;
      a.click();
  
    });
  }
  }
  
// p:number
//   price: any
//   labledata: any[]
//   total:any
//   value:any
//   realdata: any[]
//   count: number;
//   count1: number
//   storedata: any;
//   productForm: FormGroup
//   selectedMembers: inivce[]
//   invoice: any[];
//   invoice_date: any;
//   invoice1: inivce[];
//   report: reportinv;
//   constructor(private router: Router, private fb: FormBuilder,
//     private servicess: MyservcesService,
//     private activeRoute: ActivatedRoute) { }
//   customer_aname: any;
//   dtoptions:any = {};
//   dtTrigger:Subject<any>=new Subject<any>();
//   ngOnInit(): void {
 
//     this.total=0
//     this.dtoptions  = {
//       pagingType: 'full_numbers',
//       searching:true,
//      paging:true,
     
//      responsive: true,
//      scrollX:true,
//      lengthMenu: [1, 5, 10, 20, 50, 100, 200, 500],
//      order: [
//       [0, "desc"]
//     ],
//      pageLength: 8,
//     lengthChange:true,
//     dom: 'Blfrtip',
//     buttons: [
     
//       {
//         extend: 'colvis',
//         text:'<i class="colvis" style="font-size:09px"></i>',
//         titleAttr : '',
        
      
//         },
//       {
//         extend:    'print',
//         text:      '<i class="fa fa-print"></i>',
//         titleAttr: 'Print',
//         className:'alert-primary',
//         messageTop: ' ',
//         exportOptions: {
//           columns: ':visible',
//       },
//       customize: function (win: { document: { body: string; }; }) {
//           $(win.document.body).find('table').addClass('display').css('direction', 'rtl').css('font-size', '18px');
//           $(win.document.body).find('tr:nth-child(odd) td').each(function(index){
//               $(this).css('background-color','#D0D0D0');
//           });
//           $(win.document.body).find('h1').css('display','none');
//       }
//     },
//     {
//         extend:    'excel',
//         text:      '<i class="fa fa-file-excel-o"></i>',
//         titleAttr: 'Excel',
//         className:'alert-primary',
//         messageTop: 'تقارير الفواتير',
//     },
//   ],
//     language:{
//       searchPlaceholder:' ',
//       search:'<i class="fa fa-search"></i>',
//       paginate: { 
//         first: '<i id="f" class="fa fa-forward"></i>',
//         last: '<i class="fa fa-backward"></i>',
//        next: '<i id="n" class="fa fa-step-backward"></i>',
//        previous: '<i id="p" class="fa fa-step-forward"></i>',
//         }
//     },
   
//     };
//     this.p=1
//     this.price = 0
//     this.selectedMembers = []
//     this.count = 0;
//     this.invoice_date = ''
//     this.count1 = 0;
//     this.labledata = []
//     this.customer_aname = ''
//     this.realdata = []
//     this.storedata = '';
//     this.invoice = [];
//     this.report = {
//       enddate: new Date(),
//       startdate: new Date()

//     }
//     this.servicess.GetAllInices().subscribe((list: any) => {
//       this.storedata = list.data;
//       this.invoice = this.storedata;
//       this.findsum(this.invoice)
//       console.log( this.invoice )
//       this.dtTrigger.next(null);
      
//       for (var pr of this.invoice) {
//         this.price += pr.total_amount

//       }
 
//       //  this.renderchart(this.count, this.count1);

//     }, (ex: any) => {
//       console.log(ex);
//     });

//     this.productForm = this.fb.group({
//       startdate: ['2022-07-01', Validators.required],
//       enddate: ['2022-09-01', Validators.required],

//     });

//   }
//   previewinvioc() {

//     window.print()

//   }
// //   function compute() {
// //     // Notice I use `dataTable` and not `DataTable`
// //     var displayedRows = vm.dtInstance.dataTable._('tr', {filter: 'applied', page: 'current'});
// //     $scope.sum = 0;
// //     angular.forEach(displayedRows, function(row) {
// //         // Careful on the content of `row`
// //         $scope.sum += Number(row[0]);
// //     });
// // }
//   findsum(data:any){    
  
//     this.value= data 
//     for(let j=0;j< data.length;j++){   
//          this.total+= this.value[j].total_amount  
//          console.log(this.total)  
//     }  
//   }  
//   sorting1() {
    
//     this.servicess.GetAllcustmers().subscribe((list: any) => {

//       this.invoice = this.invoice.reverse()
 

//       //  this.renderchart(this.count, this.count1);

//     }, (ex: any) => {
//       console.log(ex);
//     });
//   }
//   sorting() {
//     this.servicess.GetAllInices().subscribe((list: any) => {

//       this.invoice = this.invoice.reverse()
//       this.price =0
//       for (var pr of this.invoice) {
//         this.price += pr.total_amount

//       }

//       //  this.renderchart(this.count, this.count1);

//     }, (ex: any) => {
//       console.log(ex);
//     });
//   }
//   sortingup() {
//     this.servicess.GetAllInices().subscribe((list: any) => {
//       this.storedata = list.data;
//       this.invoice = this.invoice

//       for (var pr of this.invoice) {
//         this.price += pr.total_amount

//       }

//       //  this.renderchart(this.count, this.count1);

//     }, (ex: any) => {
//       console.log(ex);
//     });
//   }
 


//   sertch() {
//     this.price =0
//     if (this.customer_aname == '') {
//       this.ngOnInit()
//     }
//     else {

//       this.invoice = this.invoice.filter(re => {
//         return re.customer.customer_aname?.toLocaleLowerCase().match(this.customer_aname?.toLocaleLowerCase());
//       })
//     }
//     for (var pr of this.invoice) {
//       this.price += pr.total_amount

//     }
//   }

// }



