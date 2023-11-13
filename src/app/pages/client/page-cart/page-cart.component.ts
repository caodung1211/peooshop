import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.scss']
})
export class PageCartComponent implements OnInit{

  ids:any = []

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
      "quantity": 2,
      "color": "15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "date_update": 1698138300596,
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
      "quantity": 2,
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
      "quantity": 2,
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
      "quantity": 2,
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
      "quantity": 2,
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
      "quantity": 2,
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

  totalOrder = 0

  constructor(){
    this.getListCart()
  }


  ngOnInit(): void {
    this.countOrder()
  }

  countOrder(){
    this.listCartOrder.map((x:any)=>{
      this.totalOrder = this.totalOrder + x.price
      return x
    })
  }

  removeItem(id:string):void{
    this.listCartOrder = this.listCartOrder.filter((x:any)=>{
      return x.id !== id
    })
  }

  onSubmit(){

  }

  reduce(id:string){
    this.listCartOrder.map((x:any)=>{
      if(x.id === id){
        if(x.quantity === 1){
          this.removeItem(id)
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

    console.log(this.ids)
  }
}
