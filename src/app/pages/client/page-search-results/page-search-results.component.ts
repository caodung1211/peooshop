import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { clientProductbService } from 'src/app/service/client/product.service';
@Component({
  selector: 'app-page-search-results',
  templateUrl: './page-search-results.component.html',
  styleUrls: ['./page-search-results.component.scss']
})
export class PageSearchResultsComponent implements OnInit{
  currentData:any = []

  configProduct = {
    columns: 4,
    total: 0,
  }

  objectFilter:any = {}

  keySearch = ''

  constructor(private router:Router,private route: ActivatedRoute,public clientProductbService:clientProductbService){

    this.route.queryParams.subscribe((params:any) => {
       params = {...params,...{page: params?.page ? params?.page  : 0}}
       this.objectFilter = params
       console.log(this.objectFilter)
       this.loadData(this.objectFilter)
     });
     }

  ngOnInit() {
  }

  loadData(data:any){
  this.clientProductbService.searchProduct(data).subscribe(
    (res:any)=>{
      this.currentData = res.data

      this.currentData.map((x: any) => {
        x.discount = (
          ((x.price - x.price_sale) / x.price) *
          100
        ).toFixed(1);
        x.gallery = JSON.parse(x.gallery);
        return x;
      });

      this.configProduct.total = res.total
    },
    err=>{
      
    }
  )
  }

  handlePaginator($event:any){
    this.objectFilter["page"] = $event?.page
    this.router.navigate(['/tim-kiem'], { queryParams: this.objectFilter });
  }

}
