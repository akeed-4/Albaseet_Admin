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
