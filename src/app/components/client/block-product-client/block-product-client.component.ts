import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-block-product-client',
  templateUrl: './block-product-client.component.html',
  styleUrls: ['./block-product-client.component.scss']
})
export class BlockProductClientComponent implements OnInit{

  @Input() products:any
  @Input() columns:any

  maxWidth = ''

  constructor(private DataBroadcastService: DataBroadcastService){

  }

  ngOnInit() {
    this.maxWidth = (100 / this.columns) +'%'
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

}
