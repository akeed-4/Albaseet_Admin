import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../models/approveinvice';
import { customer } from '../models/customers';
import { recipte } from '../models/recipte';

@Component({
  selector: 'app-view-recipte',
  templateUrl: './view-recipte.component.html',
  styleUrls: ['./view-recipte.component.css']
})
export class ViewRecipteComponent {

  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute

  ) { }

  aprove: approveinvice;
  recipte: recipte [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;

  ngOnInit(): void {
    
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
      this.recipte = list.data;

    }, (ex: any) => {
      console.log(ex);
    });
  }


  Addrequst(){
    this.router.navigate(['AddRequst']);
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

