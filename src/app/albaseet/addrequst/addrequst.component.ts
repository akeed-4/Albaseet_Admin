import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import { customer } from '../models/customers';
import { products } from '../models/products';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-addrequst',
  templateUrl: './addrequst.component.html',
  styleUrls: ['./addrequst.component.css']
})
export class AddrequstComponent implements OnInit {
  num1: number;
  isactive: boolean;
  products: any;
  num3: number;
  productsss: any;
  temp: unknown[];


  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute, private fb: FormBuilder

  ) { }
  id: any
  p: number;
  customer_aname: any;
  btnTitle: string
  isloading: boolean;

  productForm: FormGroup
  customers: customer[];
  reverseArray: any[]
  customer: customer;
  //doctor: AddDoctorModel;
  num: number;
  productsInvio: any[]
  message: string;
  messageValidate = {
    title: {
      required: ' اسم الصنف مطلوب!',
    },


    body: {
      required: 'السعر  مطلوب..!',
    },

  };
  dtoptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.productsInvio = []

    this.Getproducts()
    this.dtoptions = {
      pagingType: "simple_numbers",
      searching: true,
      paging: true,
      processing: true,
      pageLength: 10,
      dom: 'Blfrtip',
      buttons: [

        {
          extend: 'colvis',
          text: '<i class="colvis" style="font-size:09px"></i>',
          titleAttr: '',


        },
        {
          extend: 'print',
          text: '<i class="fa fa-print"></i>',
          titleAttr: 'Print',
          className: 'alert-primary',
          messageTop: ' ',
          exportOptions: {
            columns: ':visible',
          },
          customize: function (win: { document: { body: string; }; }) {
            $(win.document.body).find('table').addClass('display').css('direction', 'rtl').css('font-size', '18px');
            $(win.document.body).find('tr:nth-child(odd) td').each(function (index) {
              $(this).css('background-color', '#D0D0D0');
            });
            $(win.document.body).find('h1').css('display', 'none');
          }
        },

      ],
      columnDefs: [{
        targets: 0,

      }],
      //  lengthMenu: [1, 5, 10, 20, 50, 100, 200, 500],
      lengthChange: false,
      language: {
        searchPlaceholder: '  ',
        search: '',

        paginate: {
          first: '<i class="fa fa-forward"></i>',
          last: '<i class="fa fa-backward',
          next: '<i class="fa fa-step-backward"></i>',
          previous: '<i class="fa fa-step-forward"></i>',


        }
      }

    };
    this.p = 1
    this.isactive = false
    this.reverseArray = []
    this.id = 0;
    this.num1 = 0
    this.customer_aname = '',
      this.customer = {
        customer_id: 0,
        customernameRr: '',
        customer_aname: '',

        customer_ename: '',
        customer_address: '',
        customer_country: '',
        customer_city: '',

        customer_state: '',
        customer_mobile: '',
        invoices_count: 0
        , receipts_amount: 0,
        customer_postcode: '',
        customer_taxid: 0,
        user_id: 0

      }

    this.isloading = false
    this.productForm = this.fb.group({
      title: ['', Validators.required],

      body: ['', Validators.required],


    });
    this.num = 0;
    this.btnTitle = 'اضافة';
    this.customers = [];
    this.message = '';


    this.GetAllPayment1();
  }
  Getproducts() {

    this.servicess.GetAllproduct().subscribe((list: any) => {

      this.products = list.data;

    }, ex => {
      console.log(ex.error);
    });
  }


  GetAllPayment1() {
    this.servicess['GetAllpayment']().subscribe((list: any) => {
      this.customers = list.data;
      this.customers = this.customers.filter((x: any) => x.customer_aname !== null)
      //   this.customers.sort(function(a, b) {
      //     return a.customer_aname.localeCompare(b.customer_aname);
      //  });

      this.dtTrigger.next(null);
      for (var pr of this.customers) {
        this.num1 += 1

      }

    }, (ex: any) => {
      console.log(ex);

    });
  }

  Addcustomer() {
    this.router.navigate(['Addcustomer']);
  }
  ValidateModel() {
    this.customer.customer_address = this.productForm.value.title
    this.customer.customer_aname = this.productForm.value.title;
    this.customer.customer_city = this.productForm.value.title
    this.customer.customer_country = this.productForm.value.title;
    this.customer.customer_id = this.productForm.value.title
    this.customer.customer_mobile = this.productForm.value.title;
    this.customer.customer_state = this.productForm.value.title
    this.customer.customernameRr = this.productForm.value.title;
    this.customer.customer_ename = this.productForm.value.title
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
      this.router.navigate(['Addcustomer', id]);
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
      this.message = s.message.ar;


      this.GetAllPayment1();
      this.id = 0;

    }, (ex: any) => console.log(ex));
  }
  sertch() {
    this.isactive = true;
    if (this.customer_aname == '') {
      this.ngOnInit()
    }
    else {
      this.customers = this.customers.filter(re => {
        return re.customer_aname.toLocaleLowerCase().match(this.customer_aname.toLocaleLowerCase());
      })
    }

  }
  Delete1(id: any) {
    this.id = id;

  }
}

