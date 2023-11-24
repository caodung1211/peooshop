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
import { Router } from '@angular/router';
import { IAlertMessage } from 'src/app/pages/admin/admin.component';
import { MessageService } from 'primeng';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private DataBroadcastService: DataBroadcastService,private router: Router, private messageService:MessageService) {}

  alertMessage(alertMessage:IAlertMessage) {
    this.messageService.add({
      severity: alertMessage.type,
      summary: alertMessage.title,
      detail: alertMessage.message,
      life: 5000,
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add custom header
    const token = localStorage.getItem('token') || '';
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
          if(response.status === 501){
            localStorage.removeItem("token");
            localStorage.removeItem("users");
            this.router.navigate([`/admin-login`]); 
          }
        }

        return Observable.throw(response);
    });
  }
}