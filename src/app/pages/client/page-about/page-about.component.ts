import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {
  userIp: string | null = null;
  userData: any | null = null;

  constructor() { }

  ngOnInit(): void {
    // this.getIpUser().then(ip => {
    //   this.userIp = ip;
    //   console.log('Địa chỉ IP của bạn:', this.userIp);
    //   if (this.userIp) {
    //     this.getDataByIp(this.userIp).then(data => {
    //       this.userData = data;
    //       console.log('Thông tin vị trí của bạn:', this.userData);
    //     });
    //   }
    // });
  }

  async getIpUser(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return null;
    }
  }
  
  async getDataByIp(ipAddress: string): Promise<any | null> {
    fetch('https://ipapi.co/'+ipAddress+'/country/')
    .then(function(response) {
      response.json().then(jsonData => {
        console.log(jsonData);
      });
    })
    .catch(function(error) {
      console.log(error)
    });
  }
}
