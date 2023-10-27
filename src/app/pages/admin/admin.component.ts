import { Component,OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

export interface IAlertMessage {
  type?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit,AfterViewInit {

  widthSideBar = 300
  loadding = false

  showWelcome = true
  constructor(private DataBroadcastService: DataBroadcastService,private messageService:MessageService,private router: Router) {}

  ngOnInit () {
    setTimeout(() => {
      this.showWelcome = false
    }, 3500);

  }

  ngAfterViewInit() {
    this.DataBroadcastService.currentMessage.subscribe((res:any) => {
      switch (res) {
        case 'logout':
          localStorage.removeItem("token");
          localStorage.removeItem("users");
          this.router.navigateByUrl('/admin-login');
          // this.router.navigate([`/admin-login`]); 
          // // setTimeout(() => {
          //   window.location.reload();
          // }, 100);
          break;
        case 'showLoadding':
          this.loadding = true
          break;
        case 'hideLoadding':
          this.loadding = false
          break;  
        default:
          break;
      }
    });

    this.DataBroadcastService.currentAlert.subscribe((alertMessage:any) => {
      if(alertMessage) this.alertMessage(alertMessage)
    });
  }

  getWidth(data:any){
    let width = 'calc(100% - '+data+'px)'
    return width
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
