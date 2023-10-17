import { Component, OnInit } from '@angular/core';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import dataTableCategories from './../../../../json/categories.json';  
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  columns = [
    { field: 'name', header: 'Tên', visible: true, typeFilter: 'text', showFilter: true, type: 'text', center: true },
    { field: 'avatar', header: 'Ảnh đại diện', visible: true, typeFilter: '', showFilter: false, type: 'image', center: true },
    { field: 'description', header: 'Mô tả', visible: true, typeFilter: 'text', showFilter: true, type: 'text', center: true },
    { field: 'status', header: 'Trạng thái', visible: true, typeFilter: 'dropdown', showFilter: true, type: 'switch', optionDropdown: 'statusEnable', center: true },
  ]

  dataTable:any = []

  config:IConfigTableBase = {
    checkbox: true,
    stt: true,
    actions: ['edit','view','delete']
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dataTable = dataTableCategories
  }

  handleActionTable(event:any){
    switch (event.type) {
      case 'edit':
        this.addNew('0ms', '0ms',event.data)
        break;
      case 'view':
        
        break;
      case 'delete':
        
        break;
      default:
        break;
    }
  }

  addNew(enterAnimationDuration: string, exitAnimationDuration: string, data?:any): void {
    this.dialog.open(AddOrEditCategoryComponent, {
      width: '70%',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        data: data
      }
    });
  }

}
