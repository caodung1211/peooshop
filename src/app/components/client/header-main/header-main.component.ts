import { Component } from '@angular/core';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent {

cart:any = {
  number: 2
}
like:any = {
  number: 4
}

menus:any = [
  { label: 'Trang chủ', routerLink: ['/'] },
  { label: 'Giới thiệu', routerLink: ['/about'] },
  { label: 'Sản phẩm', routerLink: ['/products'] },
  { label: 'Tin tức', routerLink: ['/post'] },
  { label: 'CTV', routerLink: ['/collab'] },
  { label: 'Liên hệ', routerLink: ['/contact'] }

]

}
