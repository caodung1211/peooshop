import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { IConfigTableBase } from './table-base-layout.model';
import { Table } from 'primeng';

@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss'],
})
export class TableBaseLayoutComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() dataTable!: any[];
  @Input() columns!: any[];
  @Input() config!: IConfigTableBase
  @Input() showCurrentPageReport = false;
  
  @Output() actionTable = new EventEmitter<any>();

  @ViewChild('dt') table: Table;

  pageSizeOptions = [5, 10, 20, 50, 100]
  pageSize = 10
  
  objectFilter:any = {}
  congfigWidthColumns:any = []

  minWidthColumn = 0

  objectOption:any = {
    statusEnable: [
      {label: 'Tất cả', value: null},
      {label: 'Kích hoạt', value: true},
      {label: 'Không kích hoạt', value: false}
    ]
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns()
    this.handleDataTable()
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  handleColumns(){
    this.congfigWidthColumns = []
    if(this.config.checkbox){
      this.dataTable.map((x:any)=>{
        x.checkbox = false
        return x
      })
    }

    if(this.config.stt){
      this.dataTable.map((x:any,index:number)=>{
        x.stt = index + 1
        return x
      })
    }

    this.columns.map((x:any)=>{
      this.objectFilter[x.field] = ''
      return x
    })

    this.setWidthColumns()
  }

  setWidthColumns(){
    let totalWidthCustom = 0
    this.columns.map((x:any)=>{
      totalWidthCustom += x.customWidth ? x.customWidth : 0
    })

    this.minWidthColumn = (document.getElementsByClassName("getWidth")[0].clientWidth - 50 - 50 - (this.config.actions ? 140 : 0) - totalWidthCustom) / this.columns.length
    this.columns.map((x:any,index:number)=>{
      if(x.customWidth){
        this.congfigWidthColumns.push(x.customWidth)
      }else{
        this.congfigWidthColumns.push(this.minWidthColumn)
      }
      return x
    })
  }

  handleDataTable(){
    this.columns.map((x:any)=>{
      if(x.field === 'stock_status'){
        this.dataTable.map(z=>{
          z.stock_status = z.stock_status === '1' ? 'Còn hàng' : 'Hết hàng'
          return z
        })
      }
      return x
    })
  }

  tableAction(action:string,dataItem:any){
    let dataEmit = {
      type: action,
      data: dataItem
    }
    this.actionTable.emit(dataEmit)
  }

  hanldeChangeStatus(data:any,id:string){
    this.actionTable.emit({
      type: 'status',
      id: id,
      data: data
    })

  }

}