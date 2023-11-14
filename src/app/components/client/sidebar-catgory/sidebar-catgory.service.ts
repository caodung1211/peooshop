import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class clientSidebarService {

  constructor(private http: HttpClient) { }

  getListSize(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE_Client}/size`)
  }

  getListCategory(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE_Client}/categories`)
  }

  getListColor(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE_Client}/color`)
  }
 
}
