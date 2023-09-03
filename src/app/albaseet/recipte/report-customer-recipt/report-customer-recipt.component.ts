import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../../models/approveinvice';
import { inivce } from '../../models/invice';
import { products } from '../../models/products';
import { recipte } from '../../models/recipte';

@Component({
  selector: 'app-report-customer-recipt',
  templateUrl: './report-customer-recipt.component.html',
  styleUrls: ['./report-customer-recipt.component.css']
})
export class ReportCustomerReciptComponent {

  
  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute

  ) { }
  customer_aname:any
  aprove: approveinvice;
  recipte: recipte [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;
  storedata:any
storagdata:any[]
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
     pageLength: 6,
    lengthChange:false,
  

    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'colvis',
        text:' '
        },
      {
        extend:    'print',
        text:      '<i class="fa fa-print"></i>',
        titleAttr: 'Print',
        className:'alert-primary',
        messageTop: ' ',
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
          $(win.document.body).find('h1').css('text-align','center');
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
      searchPlaceholder:' ',
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
    this.storedata=[]
    this.storagdata=[]
    this.customer_aname=''
    
    this.aprove = {
      id: 0
    }

    this.num = 0;
    this.recipte = [];
    this.message = '';
    // this.doctor = {
    //   doctorsId: 0,
    //   doctorName: '',
    //   doctorType: '',
    //   doctorEmail:'',
    //   doctorNationality: '',
    //   doctorTelephone: '',
    //   doctorPicure: '',
    //   doctorQualifa: ''
    // }

    //this.doctors = [];

    this.getrecipte();
  }



  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list:any) => {
      this.storedata = list.data;
     
      this.recipte = this.storedata.filter((x:any)=> x.receipt_acceptance===1 ) ;
      this.dtTrigger.next(null);
console.log(  this.recipte )
    }, (ex: any) => {
      console.log(ex);
    });
  }


  Addrequst(){
    this.router.navigate(['AddRequst']);
  }

  sertch() {
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {

      this.storagdata = this.recipte.filter(re => {
        return re.customer.customer_aname?.toLocaleLowerCase().match(this.customer_aname?.toLocaleLowerCase());
      })
    }

  }

  approveRecipte(id: number) {
    
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


  SelectAll() {
    var tbl = $('#tbl');
    var header = tbl.find('thead .ckheader');
    var item = tbl.find('tbody .ckitem');

    $(function () {
      item.on('change', function () {
        if ($(this).is(':checked')) {
          $(this).closest('tr').addClass('NewRowColor');
        }
        else {
          $(this).closest('tr').removeClass('NewRowColor');
        }
      });

      header.change(function () {
        
        var c =Boolean( 'this.checked')  ;
        item.prop("checked", c);
        item.trigger('check');
        if ($(this).is(':checked')) {
          $(item).closest('tr').addClass('NewRowColor');
        }
        else {
          $(item).closest('tr').removeClass('NewRowColor');
        }
      });
    });
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
          var id = String( $(checkboxes[i]).val());
          ids.push(id);
        }
      }

      this.servicess.DeletAllcustomer(ids).subscribe((s: any) => {
        console.log(s);
        this.getrecipte();
        $("#btnClose").trigger("click");
      }, (ex: any) => console.log(ex));
    }
  }


}


