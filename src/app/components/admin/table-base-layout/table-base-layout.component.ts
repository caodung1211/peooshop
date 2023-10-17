import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { IConfigTableBase } from './table-base-layout.model';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-table-base-layout',
  templateUrl: './table-base-layout.component.html',
  styleUrls: ['./table-base-layout.component.scss']
})
export class TableBaseLayoutComponent implements OnInit, OnChanges, AfterViewInit{
  @Input() dataTable!: any[];
  @Input() columns!: any[];
  @Input() config!: IConfigTableBase

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns:string[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.handleColumns()
    this.dataSource = new MatTableDataSource()
    console.log(this.displayedColumns)
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


    this.columns.map((x:any)=>{
      this.displayedColumns.push(x.field)
      return x
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach((row:any) => this.selection.select(row));
  }

}