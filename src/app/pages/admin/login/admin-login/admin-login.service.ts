import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient) { }

  login(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/login',body)
  }

  getUserDetail(id:string): Observable<any> {
    return this.http.get(`http://peooshop.top/wp/wp-json/api/v1/users?id=${id}`)
  }

}
