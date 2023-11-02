import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class managementColorService {

  constructor(private http: HttpClient) { }

  createSize(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/colors`,body)
  }

  editSize(id:string,body:any): Observable<any> {
    return this.http.put(`${environment.BASE_URL_BE}/colors/${id}` ,body)
  }

  deleteSize(id:string,body?:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/colors/${id}`,'')
  }

  changeStatusSize(id:string,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/colors/status/${id}` ,body)
  }

  getListSize(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/colors`)
  }

 
}
