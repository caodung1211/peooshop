import { Component, EventEmitter,Input,Output, OnInit } from '@angular/core';

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

  constructor(){

  }

  ngOnInit() {
    this.configProduct.columns = this.configProduct.columns ? this.configProduct.columns : 5
    this.configProduct.pageIndex = this.configProduct.pageIndex ? this.configProduct.pageIndex : 1
    this.maxWidth = (100 / this.configProduct.columns) +'%'
  }


  handlePaginator($event:any){
    console.log($event)
    this.pagination.emit($event)
  }
}
