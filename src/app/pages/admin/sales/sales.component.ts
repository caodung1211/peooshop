import { Component, OnInit,OnDestroy } from '@angular/core';
import tinh from '../../../shared/JSON/tinh.json';
import { salesService } from './sales.service';
import { EventSourceService } from 'src/app/service/admin/event-source.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit,OnDestroy{
datafake= [
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
      "color": "01,15,16,17",
      "size": "15,16,17",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "view": 22,
      "date_update": 1699934519902
  },
  {
      "id": 13,
      "name": "Túi đeo vai hình thang Cressida Quilted Trapeze 1",
      "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.",
      "category": "012",
      "branch": "Shein",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png",
      "sale": 0,
      "status": 1,
      "stock_status": 1,
      "quantity": 2022,
      "color": "015,016,017,111,001",
      "size": "015,016,017",
      "price_cost": 2350000,
      "price": 2650000,
      "price_collab": 2450000,
      "price_sale": 2500000,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246180SyrNtPDQwu0.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246181GfHVfGH9lm1.png\"]",
      "view": 5,
      "date_update": 1699946456666
  },
  {
      "id": 14,
      "name": "Túi test 123",
      "description": "mô tả 1",
      "category": "012,13,15",
      "branch": "CNK",
      "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1698053767863e45IvpLLqV.png",
      "sale": 0,
      "status": 1,
      "stock_status": 0,
      "quantity": 12333,
      "color": "015,16,017,111,001",
      "size": "18,19",
      "price_cost": 2,
      "price": 3,
      "price_collab": 4,
      "price_sale": 5,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138126835DZhFzqNigk0.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138344730inEZHQmvmU0.png\"]",
      "view": 8,
      "date_update": 1698138345451
  },
  {
      "id": 21,
      "name": "12312d12",
      "description": "121111",
      "category": "14",
      "branch": "Shein",
      "avatar": "https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png",
      "sale": 0,
      "status": 1,
      "stock_status": 0,
      "quantity": 123,
      "color": "015,16,017,111,001",
      "size": "16",
      "price_cost": 1,
      "price": 2,
      "price_collab": 3,
      "price_sale": 4,
      "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\"]",
      "view": 2,
      "date_update": 1698910894440
  }
]
  dataOrder:any = {}
  dataSearch:any = []

  isType = 'ADD'

  keySearchProduct = ''

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
  messages:any = []

 listUser:any = []
 listProductSearch:any = []

  constructor(public salesService:salesService,private eventSourceService: EventSourceService){}

  ngOnInit() {
    this.dataSearch = this.datafake.filter((x:any)=>{
      x.stock = x.stock_status === 1 ? 'Còn hàng' : 'Hết hàng'
      return x
    })
    this.listCity = tinh
   
    this.currentOrder.shiping = 0
    this.countOrder()

    this.searchUser(this.currentData.name)

  }

  searchUser(name:string){
    this.eventSourceService.disconnect();
    this.listUser = []
    this.eventSourceService.connect(name,'user').subscribe(
      (message: any) => {
        // this.messages.push(message);
        this.listUser = message.map((x:any)=>{
          return {
            label: x.name,
            value: x.id
          }
        })
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onChangeUserName(){
    if(this.currentData.name){
      this.searchUser(this.currentData.name)
    }else{
      this.eventSourceService.disconnect();
    }
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

  addItems(){
    this.dataOrder.order_items.push({
      id: null,
      avatar: '',
      name: '',
      price: ''
    })
  }

  onSubmit(){

  }

  searchProduct(name:string){
    this.eventSourceService.disconnect();
    this.listProductSearch = []
    this.eventSourceService.connect(name,'products').subscribe(
      (message: any) => {
        // this.messages.push(message);
        this.listProductSearch = message
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onChangeSearchProduct(){
    if(this.keySearchProduct){
      this.searchProduct(this.keySearchProduct)
    }else{
      this.eventSourceService.disconnect();
    }
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

  check(){
    console.log(this.currentData)
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
  

  ngOnDestroy() {
    this.eventSourceService.disconnect();
  }
}
