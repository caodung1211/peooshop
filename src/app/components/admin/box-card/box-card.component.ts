import { Component, OnInit,Input, SimpleChanges, OnChanges } from '@angular/core';
import { sharedFunctitonService } from 'src/app/service/admin/sharedFunction.service';

@Component({
  selector: 'app-box-card',
  templateUrl: './box-card.component.html',
  styleUrls: ['./box-card.component.scss']
})
export class BoxCardComponent implements OnInit,OnChanges {
  @Input() listData:any


  constructor(public sharedFunctitonService: sharedFunctitonService) {

  }

  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
    
  }

}
