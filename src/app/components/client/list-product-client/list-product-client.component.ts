import { Component, EventEmitter,Input,Output, OnInit } from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-list-product-client',
  templateUrl: './list-product-client.component.html',
  styleUrls: ['./list-product-client.component.scss'],
})
export class ListProductClientComponent implements OnInit{

  @Input() products:any
  @Input() configProduct:any
  
  @Output() pagination = new EventEmitter<any>()

  maxWidth = ''

  constructor(private DataBroadcastService:DataBroadcastService){

  }

  ngOnInit() {
    this.configProduct.columns = this.configProduct.columns ? this.configProduct.columns : 5
    this.configProduct.pageIndex = this.configProduct.pageIndex ? this.configProduct.pageIndex : 1
    this.maxWidth = (100 / this.configProduct.columns) +'%'
  }

  addToCart(id:any){
    this.DataBroadcastService.addToCart({
      id: id,
      type: 'addToCart'
    });
  }

  likeProduct(id:any){
    this.products.map((x:any)=>{
      if(x.id === id){
        x.like = !x.like
      }
      return x
    })
    this.DataBroadcastService.addToCart({
      id: id,
      type: 'likeProduct'
    });
  }

  handlePaginator($event:any){
    console.log($event)
    this.pagination.emit($event)
  }
}
