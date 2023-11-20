import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormfiltingComponent } from './formfilting/formfilting.component';



@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardComponent,
    MatDatepickerModule,
    ReactiveFormsModule 
  ],
  declarations: [
  

    
  
    
  
    FormfiltingComponent
  ],
})
export class DashboardModule { }
