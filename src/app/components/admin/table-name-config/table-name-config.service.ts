import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class tableConfigService {

  constructor(private http: HttpClient) { }

  editTableConfig(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/table_config`,body)
  }

  getTableConfig(group_name:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/table_config?group_name=${group_name}`)
  }
}