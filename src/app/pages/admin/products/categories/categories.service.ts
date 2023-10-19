import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }


  uploadImage(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/upload_image',body)
  }

  createCategory(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/category',body)
  }

  getListCategory(): Observable<any> {
    return this.http.get('http://peooshop.top/wp/wp-json/api/v1/category')
  }

 
}
