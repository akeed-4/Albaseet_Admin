import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../../models/approveinvice';
import { inivce } from '../../models/invice';
import { products } from '../../models/products';

@Component({
  selector: 'app-report-customer-unapprove',
  templateUrl: './report-customer-unapprove.component.html',
  styleUrls: ['./report-customer-unapprove.component.css']
})
export class ReportCustomerUnapproveComponent {

  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute

  ) { }
  price: any
  storedata: any;
  invoice: inivce[];
  products: products[]
  approve: boolean;
  num: number;
  storagedata:any
  invioce: inivce;
  aprove: approveinvice;
  message: string;
  customer_aname: any;
  dtoptions:any = {};
  dtTrigger:Subject<any>=new Subject<any>();
  ngOnInit(): void {
    this.dtoptions  = {
      pagingType: 'simple_numbers',
      searching:true,
     paging:true,
    
     order: [
      [0, "desc"]
    ],
     pageLength: 8,
    lengthChange:false,
    columnDefs: [{
               "targets": 4,   // target column
               "className": "text-right",
               "width": "15%"
           }],

    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'colvis',
        text:' الاعمدة'
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
      fixedColumns:   {
        left: 2
    },
      customize: function (win: { document: { body: string; }; }) {
          $(win.document.body).find('table').addClass('display').css('direction', 'rtl').css('font-size', '18px');
          $(win.document.body).find('tr:nth-child(odd) td').each(function(index){
              $(this).css('background-color','#D0D0D0');
          });
          $(win.document.body).find('h1').css('display','none');
      }
    },
    {
        extend:    'excelHtml5',
        text:      '<i class="fa fa-file-excel-o"></i>',
        titleAttr: 'Excel',
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
  
  ],
        
  select: true,   
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
    responsive: true
    };
  
    this.storagedata=[]
    this.price = 0

    this.storedata = '';

    this.aprove = {
      id: 0
    }
    this.approve = false;
    this.num = 0;
    this.customer_aname = '';
    this.invoice = [];
    this.message = '';


    this.getInvice();

  }
  getInvice() {
    this.servicess.GetAllInices().subscribe((list: any) => {

       this.storedata = list.data;
      this.invoice =this.storedata.filter((x:any)=> x.invoice_acceptance===0)
      this.dtTrigger.next(null);
      for (var pr of  this.invoice) {
        this.price += pr.total_amount

      }

      //  this.storedata.filter((x:any)=>x. invoice_acceptance===1)

    }, (ex: any) => {
      console.log(ex);
    });
  }
  Addcustomer() {
    this.router.navigate(['Add-inivce']);
  }

  checkinvioce() {

    return true

  }

  aproveInvioce(id: number) {

    if (id != null) {
      this.aprove.id = id;

      this.servicess.approveInvioce(this.aprove).subscribe(success => {
        Swal.fire('خطاء!', '  تم اعتماد البيانات  بنجاح', 'info')
        this.ngOnInit()

      }, (ex: any) => {

        console.log(ex.error);
      })

    }
    else { alert("skm") }

  }

  EditInvioce1(id: number) {

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
        this.getInvice();
        $("#btnClose").trigger("click");
      }, (ex: any) => console.log(ex));
    }
  }

  sertch() {
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {
  
      this.storagedata= this.invoice.filter(re => {
        return re.customer.customer_aname?.toLocaleLowerCase().match(this.customer_aname?.toLocaleLowerCase());
      })
    }

  }

  
}

