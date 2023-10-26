import { Component } from '@angular/core';
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
export class AdminComponent {

  widthSideBar = 300
  loadding = false
  constructor(private DataBroadcastService: DataBroadcastService,private messageService:MessageService,private router: Router) {}

  ngOnInit () {
    this.DataBroadcastService.currentMessage.subscribe((res:any) => {
      switch (res) {
        case 'logout':
          localStorage.removeItem("token");
          this.router.navigate([`/admin-login`]);
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
      this.alertMessage(alertMessage)
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
