import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataBroadcastService {
  private messageSource = new BehaviorSubject<any>('123');
  currentMessage = this.messageSource.asObservable();

  private product_id = new BehaviorSubject<any>('');
  currentProductId = this.product_id.asObservable();

  private messageAlert = new BehaviorSubject<any>('');
  currentAlert = this.messageAlert.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeAlert(message: any) {
    this.messageAlert.next(message);
  }

  addToCart(data: any) {
    this.product_id.next(data);
  }

}
