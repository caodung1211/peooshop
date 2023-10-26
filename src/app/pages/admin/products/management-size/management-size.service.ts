import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class managementSizeService {

  constructor(private http: HttpClient) { }

  createSize(body:any): Observable<any> {
    return this.http.post('http://api.peooshop.top/wp/wp-json/api/v1/size',body)
  }

  editSize(id:string,body:any): Observable<any> {
    return this.http.put(`http://api.peooshop.top/wp/wp-json/api/v1/size/${id}` ,body)
  }

  deleteSize(id:string,body?:any): Observable<any> {
    return this.http.post(`http://api.peooshop.top/wp/wp-json/api/v1/size/${id}`,'')
  }

  changeStatusSize(id:string,body:any): Observable<any> {
    return this.http.post(`http://api.peooshop.top/wp/wp-json/api/v1/size/status/${id}` ,body)
  }

  getListSize(): Observable<any> {
    return this.http.get('http://api.peooshop.top/wp/wp-json/api/v1/size')
  }

 
}
