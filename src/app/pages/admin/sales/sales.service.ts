


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class salesService {

  constructor(private http: HttpClient) { }

  searchUser(name:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE_Client}/search?name=${name}`)
  }

  creatrOrder(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/order`, body)
  }

}
