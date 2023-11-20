import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import { products } from '../../models/products';

@Component({
  selector: 'app-view-product1',
  templateUrl: './view-product1.component.html',
  styleUrls: ['./view-product1.component.css']
})
export class ViewProduct1Component {
  page: any;

  constructor(
    private service: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
  product_aname: any;
  products: products[];
  //hospital: AddHospitalModel;
  num: number;
  message: string;
  //id: number;

  ngOnInit(): void {
    this.page=1
    this.num = 0;
    this.product_aname = '';
    this.products = [];
    this.message = '';
    // this.hospital = {
    //   hospitalId:0,
    //   hospitalName:'',
    //   hospitalAdderss:'',
    //   hospitalEmail:'',
    //   hospitalImage:''
    // }

    this.Getproducts();

    //this.hospitals = [];

  }

  sertch() {
    if (this.product_aname == '') {
      this.ngOnInit()
    }
    else {
      this.products = this.products.filter(re => {
        return re.product_aname.toLocaleLowerCase().match(this.product_aname.toLocaleLowerCase());
      })
    }

  }
  Addproduct() {
    this.router.navigate(['Addproducts']);
  }

  Getproducts() {
    this.service.GetAllproduct(this.page).subscribe((list: any) => {
      this.page++
      this.products = list.data;
   
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

  DeleteConfirms(id: string) {
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
      // this.service.Deleteproduct(ids).subscribe(_x => {
      //   this.Getproducts();
      //   $("#btnClose").trigger("click");
      // }, ex => console.log(ex));
    }

  }




  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }

}






