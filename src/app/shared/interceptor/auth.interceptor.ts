import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent,HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add custom header

    const authReq = request.clone({ headers: request.headers.append('Authorization', 'vEbmi5r5Bt1mi6ceZL45Xj837cS7Hva8jF9NMbvPZbCZdctjk0') });
    
    // pass on the modified request object
    return next
      .handle(authReq)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
        //   console.log('processing response', ev);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
        //   console.log('processing http error', response);
        }

        return Observable.throw(response);
      });
  }
}