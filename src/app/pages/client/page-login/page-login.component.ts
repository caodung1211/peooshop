import { Component } from '@angular/core';
import { AdminLoginService } from '../../admin/login/admin-login/admin-login.service';
import { MessageService } from 'primeng';
import { animate, style, transition, trigger } from '@angular/animations';
import { IAlertMessage } from '../../admin/admin.component';



@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
  animations: [
    trigger('onOff', [
      transition(':enter', [style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate(400)
    ])
    ])
 ]
})
export class PageLoginComponent {

  showPassword = false
  type = 'login'

  currentData = {
    username: '',
    password: '',
    passwordClone: ''
  }

  isShowLoadding = false

  constructor(private AdminLoginService:AdminLoginService,private messageService:MessageService) {
  }

  login(){
    // localStorage.setItem('token','123')
  }

  register(){
    console.log(this.currentData)

  }

  checkPass():any{
    if(this.type === 'register'){
      if(this.currentData.password !== '' && this.currentData.passwordClone !== ''){
        if(this.currentData.password === this.currentData.passwordClone){
          return false
        }else{
          return true
        }
      }else{
        return false
      }
      
    }else{
      return false
    }
  }


  private logMd5(data:string) {
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(data));
    return(hash.toString(CryptoJS.enc.Hex))
  }


  alertMessage(alertMessage:IAlertMessage) {
    this.messageService.add({
      severity: alertMessage.type,
      summary: alertMessage.title,
      detail: alertMessage.message,
      life: 5000,
    });
  }

}
