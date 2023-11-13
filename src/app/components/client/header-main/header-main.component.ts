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
  number: 0,
  ids: []
}
like:any = {
  number: 0,
  ids: []
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
  this.getListCart()
  this.getListLike()

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
        this.addToCart(res.id)
        break;
    
      case 'likeProduct':
        this.addToLike(res.id)
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

  addToCart(id:string){
    this.DataBroadcastService.changeAlert({
      type: 'success',
      title: 'Thành công',
      message: 'Thêm sản phẩm thành công!',
    });
  
    if(this.cart.ids.length > 0){
      let foundElement = this.cart.ids.find((x:any)=> {
        return x.id === id
      });

      if(foundElement){
        this.cart.ids.map((x:any)=>{
          if(x.id === foundElement.id){
            x.quantity += 1
          }
          return x
        })
      }else{
        this.cart.ids.push({
          id: id,
          quantity: 1
        })
      }

    }else{
      this.cart.ids.push({
        id: id,
        quantity: 1
      })
    }
    
    this.cart.number = this.cart.ids.reduce((accumulator:any, currentValue:any)=>{
      return accumulator + currentValue.quantity;
  }, 0);

    localStorage.setItem('cart',JSON.stringify(this.cart))
  }

  addToLike(id:string){
    if(this.like.ids.length > 0){
      let foundElement = this.like.ids.find((x:any)=> {
        return x.id === id
      });

      if(foundElement){
        this.like.ids.map((x:any)=>{
          if(x.id === foundElement.id){
            x.quantity += 1
          }
          return x
        })
      }else{
        this.like.ids.push({
          id: id,
          quantity: 1
        })
      }

    }else{
      this.like.ids.push({
        id: id,
        quantity: 1
      })
    }
    
    this.like.number = this.like.ids.reduce((accumulator:any, currentValue:any)=>{
      return accumulator + currentValue.quantity;
  }, 0);

    localStorage.setItem('like',JSON.stringify(this.like))
  }

  login(){
    this.DataBroadcastService.changeMessage('login');
  }

  getListCart(){
    this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : {
      number: 0,
      ids: []
    }

    console.log(this.cart)
  }

  getListLike(){
    this.like = localStorage.getItem('like') ? JSON.parse(localStorage.getItem('like') || '') : {
      number: 0,
      ids: []
    }

    console.log(this.like)
  }

}
