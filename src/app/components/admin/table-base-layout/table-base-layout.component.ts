import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IConfigTableBase } from './table-base-layout.model';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource,} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss'],
})
export class TableBaseLayoutComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() dataTable!: any[];
  @Input() columns!: any[];
  @Input() config!: IConfigTableBase

  @Output() actionTable = new EventEmitter<any>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns:string[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  pageSizeOptions = [5, 10, 20, 50, 100]
  pageSize = 5
  
  objectFilter:any = {}

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns()
    this.handleDataSource()
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleColumns(){
    this.displayedColumns = []
    
    if(this.config.checkbox){
      this.displayedColumns.push('checkbox')
      this.dataTable.map((x:any)=>{
        x.checkbox = false
        return x
      })
    }

    if(this.config.stt){
      this.displayedColumns.push('stt')
      this.dataTable.map((x:any,index:number)=>{
        x.stt = index + 1
        return x
      })
    }

    this.columns.map((x:any)=>{
      this.objectFilter[x.field] = ''
      this.displayedColumns.push(x.field)
      return x
    })

    if(this.config.actions){
      this.displayedColumns.push('action')
    }
  }

  filterTable(filter:any, event:any) {
    let temp:any = []

    this.displayedColumns.map(z=>{
        temp = this.dataTable.filter(x=>{
            if(typeof x[z] === 'string'){
              return x[z].includes(this.objectFilter[z]) 
            }
          })
console.log(temp)
      return z
    })
    this.dataSource = new MatTableDataSource(temp);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  handleDataSource(){
    console.log(this.dataTable.length)
    this.dataSource = new MatTableDataSource(this.dataTable)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row:any) => this.selection.select(row));
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  tableAction(action:string,dataItem:any){
    let dataEmit = {
      type: action,
      data: dataItem
    }
    this.actionTable.emit(dataEmit)
  }
}