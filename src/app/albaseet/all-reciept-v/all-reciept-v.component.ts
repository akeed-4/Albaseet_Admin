import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../models/approveinvice';
import { recipte } from '../models/recipte';

@Component({
  selector: 'app-all-reciept-v',
  templateUrl: './all-reciept-v.component.html',
  styleUrls: ['./all-reciept-v.component.css']
})
export class AllRecieptVComponent {

  price: number;
  dtoptions: any= {};
  dtTrigger:Subject<any>=new Subject<any>();
  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute

  ) { }
  p:number
  customer_aname:any
  aprove: approveinvice;
  storedata:any
  recipte: recipte [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;

  ngOnInit(): void {
  
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
     paging:true,
     pageLength: 8,
    lengthChange:true,
    lengthMenu: [1, 5, 10, 20, 50, 100, 200, 500],
    responsive: true,
    scrollX:true,
    select: true,
    dom: 'Blfrtip',
    buttons: [
      {
        extend: 'colvis',
        text:'<i class="colvis" style="font-size:09px"> </i>',
        titleAttr : '',
        },
      {
          extend:    'print',
          text:      '<i class="fa fa-print"></i>',
          
          titleAttr: 'Print', 
          className:'alert-primary', 
        
        exportOptions: {
          columns: ':visible',
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
          messageTop: ' ',
          exportOptions: {
            columns: ':visible',
        },
     
      },
    
  ],
    language:{
      decimal: ',',
      searchPlaceholder:' ',
      search:'<i class="fa fa-search"></i>',
      paginate: { 
        first: '<i class="fa fa-forward"></i>',
       last: '<i class="fa fa-backward"></i>',
       next: '<i class="fa fa-step-backward"></i>',
       previous: '<i class="fa fa-step-forward"></i>',
      
          
        }
    }

    };
   
    this.p=1
    this.storedata=[]
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
    this.price=0
    this.getrecipte();
  }
  previewinvioc() {
    window.print()
  }
  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list:any) => {
      this.storedata = list.data;
      this.recipte = this.storedata ;
      this.dtTrigger.next(null);
      for (var pr of this.recipte) {
        this.price += pr.receipt_amount
      }

    }, (ex: any) => {
      console.log(ex);
    });
  }
  sorting(){
    this.servicess.GetAllInices().subscribe((list: any) => {
    
      this.recipte= this.recipte .reverse();
    
      this.price =0
      for (var pr of this.recipte) {
        this.price += pr.receipt_amount
      }
    //  this.renderchart(this.count, this.count1);

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

      this.recipte = this.recipte.filter(re => {
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



