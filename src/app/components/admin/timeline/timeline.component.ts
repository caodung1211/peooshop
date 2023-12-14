import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit,OnChanges {

  @Input() author: any = {};

  @Input() listTimeline: any = [];
  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.listTimeline.map((x: any) => {
      if(x.status_order === 1){
        x.status_order = "Chờ xử lý";
      }else if(x.status_order === 2){
        x.status_order = "Đang xử lý";
      }else if(x.status_order === 3){
        x.status_order = "Đang giao hàng";
      }else if(x.status_order === 4){
        x.status_order = "Hoàn thành";
      }else if(x.status_order === 0){
        x.status_order = "Hủy";
      }
      return x;
    });  
    
  }

  ngOnInit() {

  }

  handleColor(type:string,index:number):any{
    if((index < this.listTimeline.length - 1) || this.listTimeline[this.listTimeline.length - 1].status_order === 'Hoàn thành'){
      return ''
    }else{
      switch (type) {
        case 'Chờ xử lý':
          return '#fdc14d'
        case 'Đang xử lý':
          return '#36a3f7'
        case 'Đang giao hàng':
          return '#36a3f7'
        case 'Hoàn thành':
          return '#2bcb98'
        case 'Hủy':
          return '#ff0000'
      }
    }
    
  }

}
