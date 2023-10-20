import { Component } from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  widthSideBar = 300
  loadding = false
  constructor(private DataBroadcastService: DataBroadcastService) {}

  ngOnInit () {
    this.DataBroadcastService.currentMessage.subscribe((res:any) => {
      switch (res) {
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
  }

  getWidth(data:any){
    let width = 'calc(100% - '+data+'px)'
    return width
  }

}
