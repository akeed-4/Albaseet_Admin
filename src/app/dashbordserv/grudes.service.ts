import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GrudesService implements CanActivate {

  constructor(private route: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      return true
    }
    else {
      localStorage.removeItem("token");
     
      this.route.navigate(['login']);
   
      return false
    }
  }
  
}
