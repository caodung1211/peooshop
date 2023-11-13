import { Component,OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';


import tinh from '../../../shared/JSON/tinh.json';
import { checkoutService } from './page-checkout.service';


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

  listCartOrder:any = [
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
    {
      "id": 12,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "12,13",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 1,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596
    },
  ]

  listCity:any
  listDistricts:any
  listWards:any

  constructor(private checkoutService:checkoutService, private router:Router,private route: ActivatedRoute){
    this.route.queryParams.subscribe((params:any) => {
       console.log(params)
       if(params?.id){
        alert("buy now")
       }else{
        
       }
     });
    }

  ngOnInit(): void {
    this.listCity = tinh
    this.currentOrder.totalPrice = 1000000
    this.currentOrder.shiping = 30000
    this.countOrder()
  }

  countOrder(){
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

}
