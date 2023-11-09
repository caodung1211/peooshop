import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router  } from '@angular/router';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  keySearch = ''

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

  // { label: 'Bộ sưu tập', routerLink: ['/bo-suu-tap'] },
  { label: 'CTV', routerLink: ['/ctv'] },
  { label: 'Liên hệ', routerLink: ['/lien-he'] }

]

constructor(private router:Router,private route: ActivatedRoute){


}

ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if(!event.url.includes('tim-kiem')) this.keySearch = ''
    }
  });
}


search(){
  if(this.keySearch){
    this.router.navigate(['/tim-kiem'], { queryParams: {key: this.keySearch} });

  }
}

}
