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
    { label: 'Mặc định', value: '' },
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
      this.sortBy = this.objectFilter.sortBy ? this.objectFilter.sortBy : ''
      this.objectFilter= this.removeNull(this.objectFilter)

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
    payload.sortBy = this.objectFilter.sortBy ? this.objectFilter.sortBy : ''


    this.clientProductbService.filterProduct(payload).subscribe(res=>{
      this.currentData = res.data
      this.configProduct.total = res.total
    })
  }

  removeNull(data:any){
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
      if(key === 'minPrice'){
        if (data[key] === 0) {
          delete data[key];
        }
      }
      if(key === 'maxPrice'){
        if (data[key] === 5000000) {
          delete data[key];
        }
      }
    });
    return data
  }

  changeSortBy(){
    this.objectFilter.sortBy = this.sortBy
    this.objectFilter= this.removeNull(this.objectFilter)
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
    this.loadData()
  }

  handleFilter($event:any){
    this.objectFilter = {...this.objectFilter,...$event}
    this.objectFilter= this.removeNull(this.objectFilter)
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
    this.loadData()
  }

  handlePaginator($event:any){
    this.objectFilter= this.removeNull(this.objectFilter)
    this.objectFilter["page"] = $event?.page
    this.router.navigate(['/charles-keith'], { queryParams: this.objectFilter });
    this.loadData()
  }
  

}
