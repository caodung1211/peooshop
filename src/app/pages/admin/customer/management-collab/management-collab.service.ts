import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class managementCollabService {

  constructor(private http: HttpClient) { }

  uploadImage(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/upload_image`,body)
  }

  createCustomer(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/users`,body)
  }

  editCustomer(id:string,body:any): Observable<any> {
    return this.http.put(`${environment.BASE_URL_BE}/users/${id}` ,body)
  }

  deleteCustomer(id:string,body?:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/users/${id}`,'')
  }

  changeStatusCustomer(id:string,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/users/status/${id}` ,body)
  }

  getListCustomer(role:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/users`)
  }

  getDetailCustomer(id:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/users/${id}`)
  }

  getListAllUser(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/users/listalluser`)
  }
  
}
