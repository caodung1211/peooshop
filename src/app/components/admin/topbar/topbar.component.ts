import { Component } from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
currrntUser:any = {}
  constructor(
    private DataBroadcastService: DataBroadcastService,
    // private messageService: MessageService
  ) {
    this.currrntUser = JSON.parse(localStorage.getItem('user')!)


  }


  logout(){
this.DataBroadcastService.changeMessage('logout')
  }

}
