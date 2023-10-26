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
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private DataBroadcastService: DataBroadcastService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add custom header
    const token = localStorage.getItem('token')! || '';
    const authReq = request.clone({ headers: request.headers.append('Authorization', token) });
    
    // pass on the modified request object
    return next
      .handle(authReq)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          // console.log('processing response', ev);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          if(response.error?.code === 'rest_forbidden'){
            this.DataBroadcastService.changeAlert({
              type: "success",
              title:"Thành công",
              message: response.error?.message
            });

            this.DataBroadcastService.changeMessage('logout');
            
          }
        }

        return Observable.throw(response);
    });
  }
}