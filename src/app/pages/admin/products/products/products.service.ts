import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class productsService {

  constructor(private http: HttpClient) { }

  uploadImage(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/upload_image`,body)
  }
  uploadImageMulti(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/upload_image/multi`,body)
  }
  
  createProduct(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/products`,body)
  }

  editProduct(id:string,body:any): Observable<any> {
    return this.http.put(`${environment.BASE_URL_BE}/products/${id}` ,body)
  }

  deleteProduct(id:string,body?:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/products/${id}`,'')
  }

  changeStatusProduct(id:string,body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/products/status/${id}` ,body)
  }

  getListProduct(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/products`)
  }

  getListSize(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/sizes`)
  }

  getListColor(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/colors`)
  }

  getListCategory(): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/categories`)
  }

  getDetailProduct(id:string): Observable<any> {
    return this.http.get(`${environment.BASE_URL_BE}/products/${id}`)
  }
 
  importProduct(body:any): Observable<any> {
    return this.http.post(`${environment.BASE_URL_BE}/import-data`,body)
  }

}
