import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root',
})
export class sharedFunctitonService {
  sharedData: any;

  private logMd5(data:string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data));
    return(hash.toString(CryptoJS.enc.Hex))
  }

  isAdmin(){
    return (this.logMd5('administrator') === localStorage.getItem('_token'))
  }
}