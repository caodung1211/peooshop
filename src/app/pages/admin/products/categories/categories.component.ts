import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCategoryComponent } from './add-or-edit-category/add-or-edit-category.component';
import { DialogConfirmCategoryComponent } from './dialog-confirm-category/dialog-confirm-category.component';
import { CategoriesService } from './categories.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { ConfirmationService, MessageService } from 'primeng';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  columns:any = []

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    actions: ['edit', 'view', 'delete'],
  };

  showColumns = false;
  tableName = 'TABLE_CATEGORIES'

  constructor(
    public dialog: MatDialog,
    private CategoriesService: CategoriesService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
  ) {}

  alertSuccess(title: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: detail,
      life: 5000,
    });
  }

  alertFailed(title: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: detail,
      life: 5000,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.CategoriesService.getListCategory().subscribe((res) => {
      this.dataTable = res.data;

      this.dataTable = this.dataTable.filter((x: any) => {
          x.status = x.status === 1 ? true : false;
          return x;
      });

      this.DataBroadcastService.changeMessage('hideLoadding');
    },err=>{
      this.DataBroadcastService.changeMessage('hideLoadding');
    }
    );
  }

  handleActionTable(event: any) {
    switch (event.type) {
      case 'edit':
        this.addNew(event.data, event.type);
        break;
      case 'view':
        this.addNew(event.data, event.type);
        break;
      case 'delete':
        this.removeItems(event.data.id);
        break;
      case 'status':
        this.changeStatus(event.id, event.data);
        break;
      default:
        break;
    }
  }

  changeStatus(id: string, data: any) {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.CategoriesService.changeStatusCategory(id, { status: data }).subscribe(
      (res) => {
          this.DataBroadcastService.changeAlert({
            type: "success",
            title:"Thành công",
            message: res.message
          });
          this.DataBroadcastService.changeMessage('hideLoadding');
        } ,err=> {
          this.DataBroadcastService.changeAlert({
            type: "error",
            title:"Thất bại",
            message: err.error.message
          });
          this.DataBroadcastService.changeMessage('hideLoadding');
        }
    );
  }

  addNew(data: any, type: string): void {
    const dialogRef = this.dialog.open(AddOrEditCategoryComponent, {
      width: '70%',
      data: {
        type: type,
        header:
          type === 'add'
            ? 'Thêm mới'
            : type === 'view'
            ? 'Xem chi tiết'
            : 'Chỉnh sửa',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  removeItems(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmCategoryComponent, {
      width: '400px',
      data: {
        title: 'Xóa danh mục',
        message: 'Bạn có muốn xóa danh mục này?',
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  handleCloseTableConfig($event: any) {
    if ($event.hide) {
      this.showColumns = false;
    }
    this.handleColumns($event.data);
  }

  handleColumns(columns: any) {
    this.columns = columns.map((x: any) => {
      if (x.field === 'name') {
        x.customWidth = 200;
      }

      return x;
    });
  }
}
