import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';


import tinh from '../../../shared/JSON/tinh.json';
import { checkoutService } from './page-checkout.service';
import { clientCartService } from 'src/app/service/client/cart.service';


@Component({
  selector: 'app-page-checkout',
  templateUrl: './page-checkout.component.html',
  styleUrls: ['./page-checkout.component.scss']
})
export class PageCheckoutComponent implements OnInit{

  currentData:any = {
    name: '',
    phone: '',
    address: '',
    city: '',
    districts: '',
    wards: '',
    isSaveAddress: false,
    shipping: 'ghtk',
    note: ''
  }

  currentOrder:any = {
    totalPrice: 0,
    discount: 0,
    shiping: 0,
    totalOrder: 0
  }

  code_discount = ''
  errCodeDiscount = false

  methodShip = [
    {value: 'ghtk', id:"ghtk"},
    {value: 'Trong ngày', id:"trong-ngay"}
  ]

  listCartOrder:any = []

  listCity:any
  listDistricts:any
  listWards:any

  ids:any = []

  constructor(private checkoutService:checkoutService, private router:Router,private route: ActivatedRoute, public clientCartService:clientCartService){
    this.route.queryParams.subscribe((params:any) => {
      this.getListCart()
       console.log(params)
       if(params?.id){
        alert("buy now")
       }else{
        
       }
     });
    }

  ngOnInit(): void {
    this.listCity = tinh
   
    this.currentOrder.shiping = 0
    this.countOrder()
  }

  countOrder(){
    this.listCartOrder.map((x:any)=>{
      this.currentOrder.totalPrice += x.total
      if(x.sale === 1){
      }else{
        this.currentOrder.totalPrice += x.total
      }
      return x
    })

    this.currentOrder.totalOrder = this.currentOrder.totalPrice + this.currentOrder.shiping - this.currentOrder.discount
  }

  getListCountry(){

  }

  check(){
console.log(this.currentData)
  }

  changeOptionCity(type:string){
    switch (type) {
      case 'city':
        this.listDistricts = []
        this.listCity.map((x:any)=>{
          if(x.Id === this.currentData.city){
            this.listDistricts = x.Districts
          }
          return x
        })
        this.currentData.districts = null
        this.currentData.wards = null

        break;
      case 'districts':
        this.listWards = []
        this.currentData.wards = null

        this.listDistricts.map((x:any)=>{
          if(x.Id === this.currentData.districts){
            this.listWards = x.Wards

          }
          return x
        })
        
        break;
      
      case 'wards':

        break;
      default:
        break;
    }
  }

  onSubmit(){

  }

  ApplyDiscount(){
    if(this.code_discount === '123'){
      this.currentOrder.discount = 200000
    this.countOrder()
this.errCodeDiscount = false
    }else{
      this.errCodeDiscount = true
    }
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

          if(x.sale === 1){
            x.total = x.price_sale*x.quantity

          }else{
            x.total = x.price*x.quantity
          }

        return x
      })

      this.countOrder()
    })
  }

}
