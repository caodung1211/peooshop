import { Component, OnInit } from '@angular/core';
import { clientProductbService } from 'src/app/service/client/product.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-product-detail',
  templateUrl: './page-product-detail.component.html',
  styleUrls: ['./page-product-detail.component.scss'],
})
export class PageProductDetailComponent implements OnInit {
  currentData = {
    id: 12,
    name: 'Túi đeo vai hình thang Cressida Quilted Trapeze',
    description:
      'Túi Cressida nổi bật với phom dáng hình thang độc đáo, kết cấu chần bông trang nhã và tông màu be tuyệt đẹp. Việc bổ sung dây đeo chuỗi xích giúp tạo thêm vẻ quyến rũ, khiến túi vừa phù hợp để sử dụng ban ngày vừa hoàn hảo cho những buổi tiệc tối sang trọng. Ngoài ra, túi còn có khóa cài kim loại cao cấp và an toàn, mở ra bên trong kích thước rộng rãi giúp lưu trữ được nhiều vật dụng cần thiết của bạn.',
    category: '12,13',
    branch: 'Shein',
    avatar:
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
    sale: 1,
    status: 1,
    stock_status: 1,
    quantity: 2022,
    color: '15,16,17',
    size: '15,16,17',
    price_cost: 2350000,
    price: 2650000,
    price_collab: 2450000,
    price_sale: 2500000,
    gallery: [
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
      'http://peooshop.top/wp/wp-content/themes/peooshop/images/1697863676868LmdQhWCstA.png',
      'https://venkateshbaddela.github.io/ecommerce-main-page/images/image-product-1.jpg',
    ],
    date_update: 1698138300596,
    discount: '5.7',
  };
  productID = '';
  quantity = 1;

  imgLightBox = '';
  isShowLightBox = false;

  constructor(
    private DataBroadcastService: DataBroadcastService,
    public clientProductbService: clientProductbService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.productID = params.id;
      this.loadData(params.id);
    });
  }

  ngOnInit(): void {}

  loadData(id: string) {
    this.clientProductbService.getDetailProduct(id).subscribe((res) => {
      this.currentData = res.data;
    });
  }

  setLightBox(item: any) {
    this.imgLightBox = item;
    this.isShowLightBox = true;
  }

  addToCart() {
    this.DataBroadcastService.addToCart({
      id: this.currentData.id,
      type: 'addToCart',
    });
  }
}
