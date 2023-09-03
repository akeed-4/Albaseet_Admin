import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../models/invice';
import { reportinv } from '../models/report';

@Component({
  selector: 'app-report-invioce-returned',
  templateUrl: './report-invioce-returned.component.html',
  styleUrls: ['./report-invioce-returned.component.css']
})
export class ReportInvioceReturnedComponent {

  price: any
  labledata: any[]
  realdata: any[]
  count: number;
  count1: number
  storedata: any;
  productForm: FormGroup
  selectedMembers: inivce[]
  invoice: any[];
  invoice_date: any;
  invoice1: inivce[];
  report: reportinv;
  constructor(private router: Router, private fb: FormBuilder,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute) { }
  customer_aname: any;
  dtoptions:any = {};
  dtTrigger:Subject<any>=new Subject<any>();
  ngOnInit(): void {
    this.dtoptions  = {
      pagingType: 'simple_numbers',
      searching:true,
     paging:true,
     responsive: true,
    
     order: [
      [0, "desc"]
    ],
     pageLength: 8,
    lengthChange:false,
   

    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'colvis',
        text:'<i class="colvis" style="font-size:09px">عرض / اخفاء</i>',
        titleAttr : 'Show/Hide',
        },
      {
        extend:    'print',
        text:      '<i class="fa fa-print"></i>',
        titleAttr: 'Print',
        className:'alert-primary',
        messageTop: 'تقارير الفواتير',
        exportOptions: {
          columns: ':visible',
      },
    
      customize: function (win: { document: { body: string; }; }) {
          $(win.document.body).find('table').addClass('display').css('direction', 'rtl').css('font-size', '18px');
          $(win.document.body).find('tr:nth-child(odd) td').each(function(index){
              $(this).css('background-color','#D0D0D0');
          });
          $(win.document.body).find('h1').css('text-align','center');
      }
    },
    {
        extend:    'excel',
        text:      '<i class="fa fa-file-excel-o"></i>',
        titleAttr: 'Excel',
        className:'alert-primary',
        messageTop: 'تقارير الفواتير',
        exportOptions: {
          columns: ':visible',
      },
     
    },
  
  ],
        
   
    language:{
      searchPlaceholder:'ابحث هنا',
      search:"",
      paginate: { 
        first: '<i id="f" class="fa fa-forward"></i>',
       last: '<i id="l" class="fa fa-backward',
       next: '<i id="n" class="fa fa-step-backward"></i>',
       previous: '<i id="p" class="fa fa-step-forward"></i>',
      
          
        }
       
    },
   
    };
    this.getAllinvioce()
    this.price = 0
    this.selectedMembers = []
    this.count = 0;
    this.invoice_date = ''
    this.count1 = 0;
    this.labledata = []
    this.customer_aname = ''
    this.realdata = []
    this.storedata = '';
    this.invoice = [];
    this.report = {
      enddate: new Date(),
      startdate: new Date()

    }
   

    this.productForm = this.fb.group({
      startdate: ['2022-07-01', Validators.required],
      enddate: ['2022-09-01', Validators.required],

    });

  }
 getAllinvioce(){
  this.servicess.GetAllInices().subscribe((list: any) => {
    this.storedata = list.data;
    this.invoice = this.storedata.filter((x: any) => x.invoice_type==="004"&&x.invoice_acceptance === 1)
    this.dtTrigger.next(null);
    for (var pr of this.invoice) {
      this.price += pr.total_amount

    }
    console.log(  this.invoice )
    //  this.renderchart(this.count, this.count1);

  }, (ex: any) => {
    console.log(ex);
  });
 }
  sorting() {
    this.servicess.GetAllInices().subscribe((list: any) => {

      this.invoice = this.invoice.reverse()
      for (var pr of this.invoice) {
        this.price += pr.total_amount

      }

      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    });
  }
  sortingup() {
    this.servicess.GetAllInices().subscribe((list: any) => {
      this.storedata = list.data;
      this.invoice = this.invoice

      for (var pr of this.invoice) {
        this.price += pr.total_amount

      }

      //  this.renderchart(this.count, this.count1);

    }, (ex: any) => {
      console.log(ex);
    });
  }
 


  sertch() {
    this.price =0
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {

      this.invoice = this.invoice.filter(re => {
        return re.customer.customer_aname?.toLocaleLowerCase().match(this.customer_aname?.toLocaleLowerCase());
      })
    }
    for (var pr of this.invoice) {
      this.price += pr.total_amount

    }
  }

}



