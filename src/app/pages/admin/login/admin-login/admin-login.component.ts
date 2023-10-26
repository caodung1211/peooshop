import { Component } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as CryptoJS from "crypto-js";
import { AdminLoginService } from './admin-login.service';
import { IAlertMessage } from '../../admin.component';
import { MessageService } from 'primeng';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
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
export class AdminLoginComponent {

  showPassword = false
  type = 'login'

  currentData = {
    username: '',
    password: '',
    passwordClone: ''
  }

  isShowLoadding = false

  constructor(private router: Router,private AdminLoginService:AdminLoginService,private messageService:MessageService) {
  }

  login(){
    this.isShowLoadding = true
    this.currentData.password
    this.AdminLoginService.login({
      username: this.currentData.username,
      password: this.logMd5(this.currentData.password)
    }).subscribe(
      res=>{
        if(res.status === 200){
          localStorage.setItem('token',res?.data?.token)
  
          

          this.AdminLoginService.getUserDetail(res?.data?.id).subscribe(
            resUser=>{
            this.isShowLoadding = false
            localStorage.setItem('user',JSON.stringify(resUser.message))

              this.alertMessage({
                type: "success",
                title:"Thành công",
                message: res.data.message
              });
              setTimeout(() => {
                this.router.navigate([`/admin`]);
              }, 1000);
            }
          )

          
        }else{
          this.isShowLoadding = false
          this.alertMessage({
          type: "error",
          title:"Thất bại",
          message: res.message
        });
        }
       
      },
      err=>{
        this.isShowLoadding = false
        this.alertMessage({
          type: "error",
          title:"Thất bại",
          message: err.message
        });
      }
    )
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
