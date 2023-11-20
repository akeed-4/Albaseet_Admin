import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';

import { customer } from '../models/customers';
import { SpinnerService } from 'src/app/services/spinner.service';




@Component({
  selector: 'app-requst',
  templateUrl: './requst.component.html',
  styleUrls: ['./requst.component.css']
})
export class RequstComponent implements OnInit {

  
  constructor(public spinner: SpinnerService) { }


  customers: customer [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;

  ngOnInit(): void {
    this.num = 0;
    this.customers = [];
    this.message = '';
    this.getDoctors();
  }
  getDoctors() {
    
  }
  
  
  

}
