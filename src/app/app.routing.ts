import { Routes } from '@angular/router';
import { GrudesService } from './dashbordserv/grudes.service';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './albaseetCars/login/login.component';


export const AppRoutes: Routes = [

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },
 



  // { path: 'Addcars', component: AddCarstypeComponent },


  //  { path: 'registar', component: CreatAccountTabbiComponent },

  // { path: 'Addmodelcar', component: AddCarmodelComponent },
  // { path: 'Addtypecar', component: AddCarstypeComponent },
  // // { path: 'Addcolorcar', component: AddCarcolorComponent },
  // { path: 'AddPurchase_invoices', component: AddPurchaseInvoicesComponent },

  // { path: 'viewCars', component: ViewCarComponent },

  // { path: 'AddSales_invoices', component: AddSalesContractComponent },
  // { path: 'addclasscar', component: AddClassCarsComponent },
  // { path: 'AddRecieptsales', component: EditReceiptComponent },
  // { path: 'addcar', component: AddCarstypeComponent },
  // { component: AddSalesContractComponent, path: "editinvoice/:invoiceno" },
  {
    path: '',
    component: FullComponent,
    canActivate:[GrudesService],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
     
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),
          
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  }
];
