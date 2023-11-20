
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private oidcSecurityService: OidcSecurityService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((isAuthorized: any) => {
        if (!isAuthorized.isAuthenticated) {
          this.router.navigate(['/unauthorized']);
          return false;
        } else {
          TODO: //Production READY

          // var currentRoute = route.routeConfig?.path || '';
          // if (this.userCanRoute(currentRoute)) {
          //   return true;
          // }
          // this.router.navigate(['/unauthorized']);
          // return false;
          return true;
        }
      })
    );
  }

  userCanRoute(routingUrl : string){
  //   this.currentUserService.userCanRoute(routingUrl).subscribe(result => {
  //     console.log(result);
  //     return result;
  //   })
  //   return false;
  // }
}
}