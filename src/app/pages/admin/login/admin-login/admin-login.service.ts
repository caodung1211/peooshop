import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http: HttpClient) { }

  login(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/login`,body)
  }

  getUserDetail(id:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/users/${id}`)
  }

}
