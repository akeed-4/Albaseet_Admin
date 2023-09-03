import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-setting',
  templateUrl: './my-setting.component.html',
  styleUrls: ['./my-setting.component.css']
})
export class MySettingComponent {
  constructor( private rout:Router) { }
  profileSetupHospital(){
    this.rout.navigate(['ProfileSetupHospital'])
  }
}
