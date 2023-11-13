import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-like',
  templateUrl: './page-like.component.html',
  styleUrls: ['./page-like.component.scss']
})
export class PageLikeComponent implements OnInit{
  dataFake = [ { "id": 12, "name": "Túi đeo vai hình thang Cressida Quilted Trapeze", "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.", "category": "12,13", "branch": "Shein", "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png", "sale": 1, "status": 1, "stock_status": 1, "quantity": 2022, "color": "15,16,17", "size": "15,16,17", "price_cost": 2350000, "price": 2650000, "price_collab": 2450000, "price_sale": 2500000, "gallery": [ "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png" ], "date_update": 1698138300596, "discount": "5.7" }, { "id": 13, "name": "Túi đeo vai hình thang Cressida Quilted Trapeze 1", "description": "Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.", "category": "15", "branch": "Shein", "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png", "sale": 0, "status": 1, "stock_status": 1, "quantity": 2022, "color": "15,16,17", "size": "15,16,17", "price_cost": 2350000, "price": 2650000, "price_collab": 2450000, "price_sale": 2500000, "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246180SyrNtPDQwu0.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246181GfHVfGH9lm1.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246181cUBamQ5Ek82.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138246181kfdOOUwI423.png\"]", "date_update": 1698138246882 }, { "id": 14, "name": "Túi test 123", "description": "mô tả 1", "category": "12,13,15", "branch": "CNK", "avatar": "http://peooshop.top/wp/wp-content/themes/peooshop/images/1698053767863e45IvpLLqV.png", "sale": 0, "status": 0, "stock_status": 0, "quantity": 12333, "color": "15,16,17,18", "size": "18,19", "price_cost": 2, "price": 3, "price_collab": 4, "price_sale": 5, "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138126835DZhFzqNigk0.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138344730inEZHQmvmU0.png\"]", "date_update": 1698138345451 }, { "id": 21, "name": "12312d12", "description": "121111", "category": "14", "branch": "Shein", "avatar": "https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png", "sale": 0, "status": 0, "stock_status": 0, "quantity": 123, "color": "17", "size": "16", "price_cost": 1, "price": 2, "price_collab": 3, "price_sale": 4, "gallery": "[\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138126835DZhFzqNigk0.png\",\"http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138126836iRcUHPlLZO1.png\"]", "date_update": 1698138127523 }, { "id": 22, "name": "Túi đeo vai hình thang Cressida Quilted Trapeze", "description": "12", "category": "13,14,15", "branch": "CNK", "avatar": "https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png", "sale": 1, "status": 1, "stock_status": 1, "quantity": 12, "color": "18,20", "size": "16,17", "price_cost": 1, "price": 1, "price_collab": 2, "price_sale": 3, "gallery": [ "http://peooshop.top/wp/wp-content/themes/peooshop/images/1698138660845r9DY3l4oAE0.png", "http://peooshop.top/wp/wp-content/themes/peooshop/images/16981386608476WbkMA0O2z1.png" ], "date_update": 1698138661581, "discount": "-200.0" } ]

  configProduct = {
    columns: 4,
    total: 100,
  }

  objectFilter:any = {}

  keySearch = ''

  constructor(private router:Router,private route: ActivatedRoute){

    this.route.queryParams.subscribe((params:any) => {
       params = {...params,...{page: params?.page ? params?.page  : 0}}
       this.objectFilter = params
       console.log(this.objectFilter)
     });
     }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.dataFake = this.dataFake.concat(this.dataFake)
      
    }
  }


  handlePaginator($event:any){
    this.objectFilter["page"] = $event?.page
    this.router.navigate(['/tim-kiem'], { queryParams: this.objectFilter });
  }

}
