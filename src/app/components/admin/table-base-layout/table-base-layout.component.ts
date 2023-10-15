import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss']
})
export class TableBaseLayoutComponent implements OnInit, OnChanges{
  dataTable!: any[];
  columns!: any[];

  selectedItems!: any[];

  rowsPerPageOptions = [10,20,50,100,200]

  globalFilterFields = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns()
  }

  ngOnInit() {
    this.dataTable = [];
  }

  handleColumns(){
    this.columns = [
      { field: 'name', header: 'Ten', visible: true, typeFilter: 'text', showFilter: true },
      { field: 'avatar', header: 'Anh dai dien', visible: true, typeFilter: '', showFilter: false },
      { field: 'description', header: 'Mo ta', visible: true, typeFilter: 'text', showFilter: true },
    ]

    // this.columns.map((x:any)=>{
    //   this.globalFilterFields.push(x.field)
    //   return x
    // })
  }

}