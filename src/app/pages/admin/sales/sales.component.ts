import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit{

  dataOrder:any = {}
  isType = 'ADD'

  constructor(){}

  ngOnInit() {}

  addItems(){
    this.dataOrder.order_items.push({
      id: null,
      avatar: '',
      name: '',
      price: ''
    })
  }

  onSubmit(){

  }
}
