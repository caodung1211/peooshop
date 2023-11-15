import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { clientProductbService } from 'src/app/service/client/product.service';

@Component({
  selector: 'app-page-products',
  templateUrl: './page-products.component.html',
  styleUrls: ['./page-products.component.scss']
})
export class PageProductsComponent implements OnInit{

  currentData:any = []

  list_sort = [
    { label: 'Hàng mới về', value: '' },
    { label: 'Được xem nhiều nhất', value: 'view' },
    { label: 'Giá ( từ cao đến thấp )', value: 'price_desc' },
    { label: 'Giá ( từ thấp đến cao )', value: 'price_asc' },
  ]

  configProduct = {
    columns: 4,
    total: 100,
  }

  sortBy = ''

  objectFilter:any = {}

  constructor(private router:Router,private route: ActivatedRoute, public clientProductbService:clientProductbService){

 this.route.queryParams.subscribe((params:any) => {
    params = {...params,...{page: params?.page ? params?.page  : 0}}
    this.objectFilter = params
  });
  }

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    let payload:any = {}

    payload.category = this.objectFilter.category ? this.objectFilter.category.split(',') : []
    payload.size = this.objectFilter.size ? this.objectFilter.size.split(',') : []
    payload.color = this.objectFilter.color ? this.objectFilter.color.split(',') : []

    payload.page = this.objectFilter.page
    payload.maxPrice = Number(this.objectFilter.maxPrice)
    payload.minPrice = Number(this.objectFilter.minPrice)
    console.log(payload)

    this.clientProductbService.filterProduct(payload).subscribe(res=>{
      this.currentData = res.data
    })
  }

  changeSortBy(){
    this.objectFilter.sortBy = this.sortBy
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
  }

  handleFilter($event:any){
    this.objectFilter = {...this.objectFilter,...$event}
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
    this.loadData()
  }

  handlePaginator($event:any){
    this.objectFilter["page"] = $event?.page
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
    this.loadData()
  }
  

}
