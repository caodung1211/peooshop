import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { IAlertMessage } from 'src/app/pages/admin/admin.component';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit,AfterViewInit{

  loadding = false

  constructor(private router: Router,private DataBroadcastService: DataBroadcastService,private messageService:MessageService) {}

  alertMessage(alertMessage:IAlertMessage) {
    this.messageService.add({
      severity: alertMessage.type,
      summary: alertMessage.title,
      detail: alertMessage.message,
      life: 5000,
    });
  }

  ngOnInit () {
    // this.DataBroadcastService.currentMessage.subscribe((res:any) => {
    //   switch (res) {
    //     case 'logout':
    //       localStorage.removeItem("token");
    //       this.router.navigate([`/admin-login`]);
    //       break;
    //     case 'showLoadding':
    //       this.loadding = true
    //       break;
    //     case 'hideLoadding':
    //       this.loadding = false
    //       break;  
    //     default:
    //       break;
    //   }
    // });

    // this.DataBroadcastService.currentAlert.subscribe((alertMessage:any) => {
    //   this.alertMessage(alertMessage)
    // });

  }

  ngAfterViewInit() {
    this.DataBroadcastService.currentMessage.subscribe((res:any) => {
      switch (res) {
        case 'logout':
          localStorage.removeItem("token");
          this.router.navigate([`/admin-login`]);
          break;
        default:
          break;
      }
    });

    this.DataBroadcastService.currentAlert.subscribe((alertMessage:any) => {
      if(alertMessage) this.alertMessage(alertMessage)
    });
  }
}
