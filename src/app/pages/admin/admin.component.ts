import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  widthSideBar = 300

  ngOnInit () {
  }

  getWidth(data:any){
    let width = 'calc(100% - '+data+'px)'
    return width
  }

}
