import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product-client',
  templateUrl: './list-product-client.component.html',
  styleUrls: ['./list-product-client.component.scss'],
})
export class ListProductClientComponent implements OnInit{

  @Input() products:any

  ngOnInit() {
  }
}
