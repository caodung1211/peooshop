import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class tableConfigService {

  constructor(private http: HttpClient) { }

  editTableConfig(body:any): Observable<any> {
    return this.http.post(`http://peooshop.top/wp/wp-json/api/v1/table_config`,body)
  }

  getTableConfig(group_name:string): Observable<any> {
    return this.http.get(`http://peooshop.top/wp/wp-json/api/v1/table_config?group_name=${group_name}`)
  }
}
