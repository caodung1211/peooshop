import { Component,OnInit } from '@angular/core';
import { managementCollabService } from './management-collab.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MessageService } from 'primeng';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditCollabComponent } from './add-or-edit-collab/add-or-edit-collab.component';
import { DialogConfirmCollabComponent } from './dialog-confirm-collab/dialog-confirm-collab.component';
import tinh from '../../../../shared/JSON/tinh.json';
import { sharedFunctitonService } from 'src/app/service/admin/sharedFunction.service';

@Component({
  selector: 'app-management-collab',
  templateUrl: './management-collab.component.html',
  styleUrls: ['./management-collab.component.scss']
})
export class ManagementCollabComponent implements OnInit {
  columns:any = []

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    // actions: ['edit', 'view', 'delete'],
  };

  showColumns = false;
  tableName = 'TABLE_CUSTOMERS'
  listCity:any = []

  isAdmin = false

  constructor(
    public dialog: MatDialog,
    private managementCollabService: managementCollabService,
    private DataBroadcastService: DataBroadcastService,
    private sharedFunctitonService: sharedFunctitonService
  ) {
    if(this.sharedFunctitonService.isAdmin()){
      this.isAdmin = true
      this.config.actions = ['edit', 'view', 'delete']
    }else{
      this.isAdmin = false
      this.config.actions = ['edit','view']
    }
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');
    this.listCity = tinh;

    this.managementCollabService.getListCustomer('collab').subscribe((res) => {
      this.dataTable = res.data;
      this.dataTable = this.dataTable.filter((x: any) => {
          x.status = x.status === 1 ? true : false;
          this.listCity.map((z:any)=>{
            if (x.city === z.Id) {
              x.address = z.Name;
            }
            return x
          })
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
    const dialogRef = this.dialog.open(AddOrEditCollabComponent, {
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
    const dialogRef = this.dialog.open(DialogConfirmCollabComponent, {
      width: '400px',
      data: {
        title: 'Xóa CTV',
        message: 'Bạn có muốn xóa CTV này?',
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