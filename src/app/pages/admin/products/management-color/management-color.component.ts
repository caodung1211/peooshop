import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MessageService } from 'primeng';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { managementColorService } from './management-color.service';
import { AddOrEditColorComponent } from './add-or-edit-color/add-or-edit-color.component';
import { DialogConfirmColorComponent } from './dialog-confirm-color/dialog-confirm-color.component';
import { sharedFunctitonService } from 'src/app/service/admin/sharedFunction.service';

@Component({
  selector: 'app-management-color',
  templateUrl: './management-color.component.html',
  styleUrls: ['./management-color.component.scss'],
})
export class ManagementColorComponent implements OnInit {
  columns:any = []

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    // actions: ['edit', 'view', 'delete'],
  };
  isAdmin = false
  showColumns = false;
  tableName = 'TABLE_COLORS'

  constructor(
    public dialog: MatDialog,
    private managementColorService: managementColorService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private sharedFunctitonService: sharedFunctitonService
  ) {
    if(this.sharedFunctitonService.isAdmin()){
      this.isAdmin = true
      this.config.actions = ['edit', 'view', 'delete']
    }else{
      this.isAdmin = false
      this.config.actions = ['view']
    }
  }

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

    this.managementColorService.getListSize().subscribe((res) => {
      this.dataTable = res.data;

      this.dataTable = this.dataTable.filter((x: any) => {
          x.status = x.status === 1 ? true : false;
          return x;
      });

      this.DataBroadcastService.changeMessage('hideLoadding');
    });
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

    this.managementColorService
      .changeStatusSize(id, { status: data })
      .subscribe((res: any) => {
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
    const dialogRef = this.dialog.open(AddOrEditColorComponent, {
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
    const dialogRef = this.dialog.open(DialogConfirmColorComponent, {
      width: '400px',
      data: {
        title: 'Xóa màu',
        message: 'Bạn có muốn xóa màu này?',
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
        x.customWidth = 100;
      }

      return x;
    });
  }
}
