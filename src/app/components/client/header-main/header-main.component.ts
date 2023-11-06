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
  { label: 'Giới thiệu', routerLink: ['/gioi-thieu'] },
  { label: 'Charles & Keith', routerLink: ['/charles-keith'] },
  { label: 'Local brand', routerLink: ['/local-brand'] },

  { label: 'Bộ sưu tập', routerLink: ['/bo-suu-tap'] },
  { label: 'CTV', routerLink: ['/ctv'] },
  { label: 'Liên hệ', routerLink: ['/lien-he'] }

]

}
