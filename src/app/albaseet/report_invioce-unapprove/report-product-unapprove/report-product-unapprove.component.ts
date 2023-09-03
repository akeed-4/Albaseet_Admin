import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { productdata } from '../../models/productdata';
import { products } from '../../models/products';

@Component({
  selector: 'app-report-product-unapprove',
  templateUrl: './report-product-unapprove.component.html',
  styleUrls: ['./report-product-unapprove.component.css']
})
export class ReportProductUnapproveComponent {

  storagdata: any;

  constructor(
    private service: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  product_aname: any;
  productname: productdata
  products1: products
  productsss: any[];
  productss: any[]
  storageserch: any[]

  num: number;
  message: string;
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
    this.Getproducts();

    //this.hospitals = [];
  }
  sertch() {

    if (this.product_aname == '') {
      this.ngOnInit()
    }
    else {
      this.productsss = this.productss.filter(re => {
        for (var item of this.productss) {
          for (var item1 of item.products)
            if (item1.product_data?.product_aname === this.product_aname) {
              this.storageserch.push(item);
              console.log(     this.storageserch)
              break
            }
        }
        this.productsss = this.storageserch
      
        return re.this.productsss
      })
    }
  }
  Addproduct() {
    this.router.navigate(['Addproducts']);
  }
  Getproducts() {
    this.service.GetAllInices().subscribe((list: any) => {
      this.storagdata=list.data
      this.productss = this.storagdata.filter((x:any)=> x.invoice_acceptance===0)
      
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
        this.Getproducts();
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
  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

  deleteproduct(ids: any) {
    this.service.Deleteproduct(ids).subscribe(_x => {
      console.log(ids)
      this.Getproducts();
      console.log(_x)
    }, ex => console.log(ex));
  }


}








