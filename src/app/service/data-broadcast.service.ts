import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataBroadcastService {
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  private messageAlert = new BehaviorSubject('');
  currentAlert = this.messageAlert.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeAlert(message: any) {
    this.messageAlert.next(message);
  }
}
