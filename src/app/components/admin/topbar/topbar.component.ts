import { Component } from '@angular/core';
import { AdminLoginService } from 'src/app/pages/admin/login/admin-login/admin-login.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  currentUser: any = {};
  constructor(
    private DataBroadcastService: DataBroadcastService,
    private AdminLoginService: AdminLoginService
  ) {
    let id = JSON.parse(localStorage.getItem('user_id')!);
    console.log(id)
    if (id) {
      this.loadUserDetail(id);
    } else {
    console.log("--")

      this.DataBroadcastService.changeMessage('logout');
    }
  }

  logout() {
    this.DataBroadcastService.changeMessage('logout');
  }

  loadUserDetail(id: string) {
    this.AdminLoginService.getUserDetail(id).subscribe((res) => {
      this.currentUser = res?.message;
    });
  }
}
