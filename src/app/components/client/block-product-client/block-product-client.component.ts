import { Component,Input,Output,OnInit,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-block-product-client',
  templateUrl: './block-product-client.component.html',
  styleUrls: ['./block-product-client.component.scss']
})
export class BlockProductClientComponent implements OnInit{

  @Input() products:any
  @Input() columns:any

  maxWidth = ''

  constructor(){

  }

  ngOnInit() {
    this.maxWidth = (100 / this.columns) +'%'
  }

}
