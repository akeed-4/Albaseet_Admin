import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError, BehaviorSubject, switchMap, filter, take } from 'rxjs';
import { loginAouthservice } from 'src/app/services/loginAouth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authservice = this.inject.get(loginAouthservice);
    let authreq = request;
    authreq = this.AddTokenheader(request, authservice.GetToken());
    return next.handle(authreq).pipe(
      catchError((errordata: { status: number; }) => {
        if (errordata.status === 401) {
          // need to implement logout
          authservice.Logout();
          // refresh token logic
        //  return this.handleRefrehToken(request, next);
        }
        return throwError(errordata);
      })
    );

  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(loginAouthservice);
    return authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        authservice.SaveTokens(data);
        return next.handle(this.AddTokenheader(request,data.jwtToken))
      }),
      catchError((errodata: any)=>{
        authservice.Logout();
        return throwError(errodata)
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({ headers: request.headers.set('Authorization', 'bearer ' + token) });
  }



}
