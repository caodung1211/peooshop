import { Component,OnInit } from '@angular/core';
import { MessageService } from 'primeng';
import { IAlertMessage } from 'src/app/pages/admin/admin.component';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit{


  constructor(private messageService:MessageService, private DataBroadcastService:DataBroadcastService){}

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

  }
}
