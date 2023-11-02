import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class libraryService {

  constructor(private http: HttpClient) { }

  getListLibrary(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/library`)
  }

  removeLibrary(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/library`,body)
  }
 
}
