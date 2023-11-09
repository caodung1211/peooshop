import { Component, OnInit } from '@angular/core';
import { productsService } from '../../admin/products/products/products.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.scss'],
})
export class PageHomeComponent implements OnInit {
  banner_url =
    'https://www.charleskeith.vn/on/demandware.static/-/Library-Sites-CharlesKeithVN/default/dw9ba0c16b/images/homepage/2023/CharlesKeith_S_home_week44_1920x825.jpg';

responsiveOptions = [
  {
      breakpoint: '991px',
      numVisible: 3,
      numScroll: 3
  },
  {
      breakpoint: '500px',
      numVisible: 1,
      numScroll: 1
  }
];

listCategory:any = []
listSize:any = []
listColor:any = []


listProduct:any = []
listProductSale:any = []

columns = 5
  constructor(public productsService:productsService) {}

  ngOnInit() {
    this.loadData()
  }


  loadData() {

    this.productsService.getListCategory().subscribe((resCategory) => {
      this.listCategory = resCategory.data

      this.productsService.getListSize().subscribe((resSize) => {
        this.listSize = resSize.data

        this.productsService.getListColor().subscribe((resColor) => {
          this.listColor = resColor.data

          this.productsService.getListProduct().subscribe((res) => {
            this.listProduct = res.data;
            this.listProductSale = this.listProduct.filter((x:any)=>{
              return x.sale === 1
            })

            this.listProductSale.map((x:any)=>{
              x.discount = (((x.price -  x.price_sale) / x.price) * 100).toFixed(1)
              x.gallery = JSON.parse(x.gallery)
return x
            })

            // this.listProduct.map((x: any) => {
            //   let temp: any = [];
            //   this.optionCustomize.dropdownCategory.map((category: any) => {
            //     x.category.split(',').map((z: any) => {
            //       if (Number(z) === category.id) {
            //         temp.push(category.label);
            //       }
            //       return z;
            //     });
            //     return category;
            //   });

            //   x.category = temp;
            //   return x;
            // });

            // this.listProduct.map((x: any) => {
            //   let temp: any = [];
            //   this.optionCustomize.dropdownSize.map((size: any) => {
            //     x.size.split(',').map((z: any) => {
            //       if (Number(z) === size.id) {
            //         temp.push(size.label);
            //       }
            //       return z;
            //     });
            //     return size;
            //   });

            //   x.size = temp;
            //   return x;
            // });

            // this.listProduct.map((x: any) => {
            //   let temp: any = [];
            //   this.optionCustomize.dropdownColor.map((color: any) => {
            //     x.color.split(',').map((z: any) => {
            //       if (Number(z) === color.id) {
            //         temp.push(color.label);
            //       }
            //       return z;
            //     });
            //     return color;
            //   });

            //   x.color = temp;
            //   return x;
            // });

          });
        });
      });
    },errCate=>{
    });
  }


}
