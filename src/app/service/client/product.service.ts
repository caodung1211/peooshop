import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class clientProductbService {

  constructor(private http: HttpClient) { }

  getListProduct(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE_Client}/products`)
  }

  filterProduct(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE_Client}/products/filter`,body)
  }

  searchProduct(data:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE_Client}/products/search`,data)
  }
 
}
