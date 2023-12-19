import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ordersService {

  constructor(private http: HttpClient) { }
  
  getDetailOrder(id:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/order/detail/${id}`)
  }
  
  getListOrder(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/order`)
  }

  getListChannels(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/order/channels`)
  }

  getListLogOrder(id:any): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/order/log/${id}`)
  }

  changeStatusOrder(id:number,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/order/status/${id}` ,body)
  }

  deleteOrder(id:string): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/products/${id}`,'')
  }

  

}
