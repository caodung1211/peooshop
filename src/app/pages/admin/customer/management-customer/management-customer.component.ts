import { Component } from '@angular/core';
import { DialogConfirmCollabComponent } from '../management-collab/dialog-confirm-collab/dialog-confirm-collab.component';
import { AddOrEditCustomerComponent } from './add-or-edit-customer/add-or-edit-customer.component';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { managementCollabService } from '../management-collab/management-collab.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmCustomerComponent } from './dialog-confirm-customer/dialog-confirm-customer.component';

@Component({
  selector: 'app-management-customer',
  templateUrl: './management-customer.component.html',
  styleUrls: ['./management-customer.component.scss']
})
export class ManagementCustomerComponent {
  columns:any = []

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    actions: ['edit', 'view', 'delete'],
  };

  showColumns = false;
  tableName = 'TABLE_CUSTOMERS'

  constructor(
    public dialog: MatDialog,
    private managementCollabService: managementCollabService,
    private DataBroadcastService: DataBroadcastService
  ) {}

  

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.managementCollabService.getListCustomer('customer').subscribe((res) => {
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

    this.managementCollabService.changeStatusCustomer(id, { status: data }).subscribe(
      (res) => {
          this.DataBroadcastService.changeAlert({
            type: "success",
            title:"Thành công",
            message: res.message
          });
        this.DataBroadcastService.changeMessage('hideLoadding');

        } ,err=> {
        this.DataBroadcastService.changeMessage('hideLoadding');

          this.DataBroadcastService.changeAlert({
            type: "error",
            title:"Thất bại",
            message: err.error.message
          });
        }
    );
  }

  addNew(data: any, type: string): void {
    const dialogRef = this.dialog.open(AddOrEditCustomerComponent, {
      width: '70%',
      height: '90vh',
      data: {
        type: type,
        header:
          type === 'add'
            ? 'Thêm mới'
            : type === 'view'
            ? 'Xem chi tiết'
            : 'Chỉnh sửa',
        data: {
          id: data.id
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });

  }

  removeItems(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmCustomerComponent, {
      width: '400px',
      data: {
        title: 'Xóa khách hàng',
        message: 'Bạn có muốn xóa khách hàng này?',
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