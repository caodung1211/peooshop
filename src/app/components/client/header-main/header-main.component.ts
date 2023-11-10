import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router  } from '@angular/router';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  keySearch = ''

cart:any = {
  number: 0
}
like:any = {
  number: 0
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

constructor(private router:Router,private route: ActivatedRoute, private DataBroadcastService:DataBroadcastService){


}

ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      if(!event.url.includes('tim-kiem')) this.keySearch = ''
    }
  });

  this.DataBroadcastService.currentProductId.subscribe((res:any) => {
    console.log(res)
    switch (res.type) {
      case 'addToCart':
        this.DataBroadcastService.changeAlert({
          type: 'success',
          title: 'Thành công',
          message: 'Thêm sản phẩm thành công!',
        });
        this.cart.number +=1
        break;
    
      case 'likeProduct':
        // this.DataBroadcastService.changeAlert({
        //   type: 'success',
        //   title: 'Thành công',
        //   message: 'Bạn thích sản phẩm này!',
        // });
        this.like.number +=1
        break;

      default:
        break;
    }
  });

}

search(){
  if(this.keySearch){
    this.router.navigate(['/tim-kiem'], { queryParams: {key: this.keySearch} });

  }
}

}
