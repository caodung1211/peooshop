import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class libraryService {

  constructor(private http: HttpClient) { }

  getListLibrary(): Observable<any> {
    return this.http.get('http://api.peooshop.top/wp/wp-json/api/v1/library')
  }

  removeLibrary(body:any): Observable<any> {
    return this.http.post('http://api.peooshop.top/wp/wp-json/api/v1/library',body)
  }
 
}
