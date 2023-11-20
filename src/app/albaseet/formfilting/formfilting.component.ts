import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';

@Component({
  selector: 'app-formfilting',
  templateUrl: './formfilting.component.html',
  styleUrls: ['./formfilting.component.scss']
})
export class FormfiltingComponent {
  productForm:FormGroup
  storedata:any;
  constructor( private router: Router,private datePipe: DatePipe,
    private servicess: MyservcesService,
  ) { 

  }

  ngOnInit(){

  }
  generateReport() {
    const startDate = this.productForm.get('startDate').value;
    const endDate = this.productForm.get('endDate').value;
  const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd HH:mm:ss');
  const formattedendtDate = this.datePipe.transform(endDate, 'yyyy-MM-dd HH:mm:ss');
  if(formattedStartDate&& formattedendtDate){
    this.servicess.checkDateForm(formattedStartDate,formattedendtDate).subscribe((list:any)=>{
      this.storedata=[]
      this.storedata=list.data.transactions;
    },err=>{
      console.log(err)
    })
    // Make a request to a server to generate the report
  }
  }
}
