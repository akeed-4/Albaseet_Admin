import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aboute-company',
  templateUrl: './aboute-company.component.html',
  styleUrls: ['./aboute-company.component.css']
})
export class AbouteCompanyComponent {
  constructor(private route:Router){}
  connected(){
this.route.navigate(['concceion_company'])

  }
}
