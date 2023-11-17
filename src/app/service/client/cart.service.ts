import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class clientCartService {

  constructor(private http: HttpClient) { }

  getListProduct(ids:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE_Client}/cart`,ids)
  }

}
