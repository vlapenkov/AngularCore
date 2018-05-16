import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // для запроса api/accounts/login не проверяем


    let relativeUrl = this.router.url; //request.url.replace(/^(?:\/\/|[^\/]+)*\//, "");
    if (request.url.includes('login')) return next.handle(request.clone());
    

    let token = localStorage.getItem('auth_token')
    if (token != null) {

      const requestCloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });      
      return next.handle(requestCloned).
        do(
        succ => { },
        err => {
          debugger;
          if (err.status === 401)
            this.router.navigate(['login'], { queryParams: { redirectToUrl: relativeUrl } })
        }
        );
    } else { this.router.navigate(['login'], { queryParams: { redirectToUrl: relativeUrl } }) }
  }
   
}