import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class productsService {

  constructor(private http: HttpClient) { }

  uploadImage(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/upload_image',body)
  }
  uploadImageMulti(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/upload_image/multi',body)
  }
  
  createProduct(body:any): Observable<any> {
    return this.http.post('http://peooshop.top/wp/wp-json/api/v1/product',body)
  }

  editProduct(id:string,body:any): Observable<any> {
    return this.http.put(`http://peooshop.top/wp/wp-json/api/v1/product/${id}` ,body)
  }

  deleteProduct(id:string,body?:any): Observable<any> {
    return this.http.post(`http://peooshop.top/wp/wp-json/api/v1/product/${id}`,'')
  }

  changeStatusProduct(id:string,body:any): Observable<any> {
    return this.http.post(`http://peooshop.top/wp/wp-json/api/v1/product/status/${id}` ,body)
  }

  getListProduct(): Observable<any> {
    return this.http.get('http://peooshop.top/wp/wp-json/api/v1/product')
  }

  getListSize(): Observable<any> {
    return this.http.get('http://peooshop.top/wp/wp-json/api/v1/size')
  }

  getListColor(): Observable<any> {
    return this.http.get('http://peooshop.top/wp/wp-json/api/v1/color')
  }

  getListCategory(): Observable<any> {
    return this.http.get('http://peooshop.top/wp/wp-json/api/v1/category')
  }

  getDetailProduct(id:string): Observable<any> {
    return this.http.get(`http://peooshop.top/wp/wp-json/api/v1/product/${id}`)
  }
 
}
