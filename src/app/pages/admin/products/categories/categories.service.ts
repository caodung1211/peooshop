import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }


  uploadImage(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/upload_image`,body)
  }

  createCategory(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/categories`,body)
  }

  editCategory(id:string,body:any): Observable<any> {
    return this.http.put(`${environment.BASE_URL_BE}/categories/${id}` ,body)
  }

  deleteCategory(id:string,body?:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/categories/${id}`,'')
  }

  changeStatusCategory(id:string,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/categories/status/${id}` ,body)
  }

  getListCategory(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/categories`)
  }

 
}
