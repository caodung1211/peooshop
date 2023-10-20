import { Component, OnInit } from '@angular/core';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { DialogConfirmCategoryComponent } from './dialog-confirm-category/dialog-confirm-category.component';
import { CategoriesService } from './categories.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

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

  constructor(public dialog: MatDialog,private CategoriesService:CategoriesService,private DataBroadcastService: DataBroadcastService) {}

  ngOnInit() {
    this.loadData()
  }

  loadData(){
    this.DataBroadcastService.changeMessage('showLoadding');
    
    this.CategoriesService.getListCategory().subscribe(res=>{
      this.dataTable = res
      this.DataBroadcastService.changeMessage('hideLoadding');
    })
  }

  handleActionTable(event:any){
    switch (event.type) {
      case 'edit':
        this.addNew(event.data,event.type)
        break;
      case 'view':
        this.addNew(event.data,event.type)
        break;
      case 'delete':
        this.removeItems(event.data.id)
        break;
      default:
        break;
    }
  }

  addNew(data:any,type:string): void {
    this.dialog.open(AddOrEditCategoryComponent, {
      width: '70%',
      data: {
        type: type,
        header: (type === 'add' ? 'Thêm mới' : (type === 'view' ? 'Xem chi tiết' : 'Chỉnh sửa')),
        data: data
      }
    });
  }

  removeItems(id:string): void {
    this.dialog.open(DialogConfirmCategoryComponent, {
      width: '400px',
      data: {
        title: "Xóa danh mục",
        message: "Bạn có muốn xóa danh mục này?",
        id: id
      }
    });
  }

}
