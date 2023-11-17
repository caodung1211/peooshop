import { Component, OnInit } from '@angular/core';
import { clientCartService } from 'src/app/service/client/cart.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.scss']
})
export class PageCartComponent implements OnInit{

  ids:any = []

  listCartOrder:any = []

  totalOrder = 0

  isShowDelete = false
  messageRemove = ''
  idRemove = ''

  constructor(public clientCartService:clientCartService, private DataBroadcastService:DataBroadcastService){
    this.getListCart()
  }


  ngOnInit(): void {
    this.countOrder()
  }

  countOrder(){
    this.totalOrder = 0
    this.listCartOrder.map((x:any)=>{
      this.totalOrder = this.totalOrder + x.price*x.quantity
      return x
    })
  }

  removeItem(id:string):void{
    if(id){
      this.listCartOrder = this.listCartOrder.filter((x:any)=>{
        return x.id !== id
      })

      this.countOrder()
      this.updateCart(id)
      this.closeRemove()
    }
  }

  onSubmit(){

  }

  reduce(item:any){
    this.listCartOrder.map((x:any)=>{
      if(x.id === item.id){
        if(x.quantity === 1){
          this.openRemove(item)
        }else{
          x.quantity = x.quantity - 1
        }
      }
      return x
    })
    this.countOrder()
  }

  increasing(id:string){
    this.listCartOrder.map((x:any)=>{
      if(x.id === id){
        x.quantity = x.quantity + 1
      }
      return x
    })
    this.countOrder()

  }

  getListCart(){
    let cartItem = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '') : {
      number: 0,
      ids: []
    }
    if(cartItem.ids.length > 0){
      cartItem.ids.map((x:any)=>{
        this.ids.push(x.id)
        return x
      })
    }else{
      this.ids = []
    }


    this.clientCartService.getListProduct({ids:this.ids}).subscribe(res=>{
      this.listCartOrder = res.data.map((x:any)=>{
        cartItem.ids.map((z:any)=>{
          if(x.id === z.id){
            x.quantity = z.quantity
          }
          return z
        })
        return x
      })

      this.countOrder()
    })
  }

  openRemove(item:any){
    this.isShowDelete = true
    this.idRemove = item.id
    this.messageRemove = 'Bạn có muốn xóa sản phẩm <b>' +item.name+ '</b> ra khỏi giỏ hàng ?'
  }
  closeRemove(){
    this.isShowDelete = false
    this.idRemove = ''
  }

  updateCart(id:string){
    this.DataBroadcastService.addToCart({
      id: id,
      type: 'updateCart'
    });
  }
}
