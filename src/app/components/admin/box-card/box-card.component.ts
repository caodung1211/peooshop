import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit {


  @Input() listData:any

  constructor(){

  }

  ngOnInit() {
    
  }

}
