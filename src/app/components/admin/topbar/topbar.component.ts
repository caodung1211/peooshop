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
         console.log(event)
        if(event.url === "/admin-login"){
            localStorage.clear()
        }
      }
    })

    let id = localStorage.getItem('user_id');
    console.log(id)
   
    if (id) {
    console.log(id)
      this.loadUserDetail(id);
    } else {
    console.log("--")
    }
    
  }


  loadUserDetail(id: string) {
    this.AdminLoginService.getUserDetail(id).subscribe((res) => {
      this.currentUser = res?.message;
    });
  }
}
