import { Component,OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/pages/admin/login/admin-login/admin-login.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit{
  currentUser: any = {};
  constructor(
    private DataBroadcastService: DataBroadcastService,
    private AdminLoginService: AdminLoginService,
    private _router:Router
  ) {
    
  }

  ngOnInit() {
    this._router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        if(event.url === "/admin-login"){
            localStorage.clear()
        }
      }
    })
    this.loadUserDetail()
    // let id = localStorage.getItem('user_id');
   
    // if (id) {
    //   this.loadUserDetail(id);
    // } else {
    // console.log("--")
    // }
    
  }


  loadUserDetail() {
    this.AdminLoginService.getUserDetail().subscribe((res) => {
      this.currentUser = res?.data;
    });
  }
}
