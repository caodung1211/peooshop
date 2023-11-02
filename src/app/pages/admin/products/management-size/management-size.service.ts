import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class managementSizeService {

  constructor(private http: HttpClient) { }

  createSize(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/sizes`,body)
  }

  editSize(id:string,body:any): Observable<any> {
    return this.http.put(`${environment.BASE_URL_BE}/sizes/${id}` ,body)
  }

  deleteSize(id:string,body?:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/sizes/${id}`,'')
  }

  changeStatusSize(id:string,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/sizes/status/${id}` ,body)
  }

  getListSize(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/sizes`)
  }

 
}
