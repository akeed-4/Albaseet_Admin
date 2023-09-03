import { Component } from '@angular/core';

@Component({
  selector: 'app-create-recipt',
  templateUrl: './create-recipt.component.html',
  styleUrls: ['./create-recipt.component.css']
})
export class CreateReciptComponent {

  constructor(){}
  ischeaked:boolean
  ngOnInit(){
    this.ischeaked=false
  }

  additem(){
return  this.ischeaked=true
  }
}
