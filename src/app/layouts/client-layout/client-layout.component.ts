import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng';
import { IAlertMessage } from 'src/app/pages/admin/admin.component';
import { PageLoginComponent } from 'src/app/pages/client/page-login/page-login.component';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit{


  constructor(private messageService:MessageService, private DataBroadcastService:DataBroadcastService, private dialog:MatDialog){}

  alertMessage(alertMessage:IAlertMessage) {
    this.messageService.add({
      severity: alertMessage.type,
      summary: alertMessage.title,
      detail: alertMessage.message,
      life: 5000,
    });
  }

  ngOnInit () {
    this.DataBroadcastService.currentAlert.subscribe((alertMessage:any) => {
      if(alertMessage) this.alertMessage(alertMessage)
    });


    this.DataBroadcastService.currentMessage.subscribe((res:any) => {
      switch (res) {
        case 'login':
          this.openLogin()
          break;
      
        default:
          break;
      }
    });
    
  }

  openLogin(){
    const dialogRef = this.dialog.open(PageLoginComponent, {
      width: '500px',
      height: '600px',
      data: {
      },
    });
  }

}
