import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss']
})
export class TableBaseLayoutComponent implements OnInit, OnChanges{
  @Input() dataTable!: any[];
  @Input() columns!: any[];

  selectedItems!: any[];

  rowsPerPageOptions = [10,20,50,100,200]

  globalFilterFields = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns()
    console.log(this.dataTable)
  }

  ngOnInit() {
  }

  handleColumns(){
    // this.columns.map((x:any)=>{
    //   this.globalFilterFields.push(x.field)
    //   return x
    // })
  }

}