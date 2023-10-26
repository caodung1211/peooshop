import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class managementCollabService {

  constructor(private http: HttpClient) { }

  uploadImage(body:any): Observable<any> {
    return this.http.post('http://api.peooshop.top/wp/wp-json/api/v1/upload_image',body)
  }

  createCustomer(body:any): Observable<any> {
    return this.http.post('http://api.peooshop.top/wp/wp-json/api/v1/customer',body)
  }

  editCustomer(id:string,body:any): Observable<any> {
    return this.http.put(`http://api.peooshop.top/wp/wp-json/api/v1/customer/${id}` ,body)
  }

  deleteCustomer(id:string,body?:any): Observable<any> {
    return this.http.post(`http://api.peooshop.top/wp/wp-json/api/v1/customer/${id}`,'')
  }

  changeStatusCustomer(id:string,body:any): Observable<any> {
    return this.http.post(`http://api.peooshop.top/wp/wp-json/api/v1/customer/status/${id}` ,body)
  }

  getListCustomer(role:string): Observable<any> {
    return this.http.get(`http://api.peooshop.top/wp/wp-json/api/v1/customer?role=${role}`)
  }

  getDetailCustomer(id:string): Observable<any> {
    return this.http.get(`http://api.peooshop.top/wp/wp-json/api/v1/customer/${id}`)

  }

 
}
