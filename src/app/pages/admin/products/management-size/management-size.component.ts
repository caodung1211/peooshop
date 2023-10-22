import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { managementSizeService } from './management-size.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { ConfirmationService, MessageService } from 'primeng';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { DialogConfirmSizeComponent } from './dialog-confirm-size/dialog-confirm-size.component';
import { AddOrEditSizeComponent } from './add-or-edit-size/add-or-edit-size.component';

@Component({
  selector: 'app-management-size',
  templateUrl: './management-size.component.html',
  styleUrls: ['./management-size.component.scss'],
})
export class ManagementSizeComponent implements OnInit {
  columns = [
    {
      field: 'name',
      header: 'Tên',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'description',
      header: 'Mô tả',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'status',
      header: 'Trạng thái',
      visible: true,
      typeFilter: 'dropdown',
      showFilter: true,
      type: 'switch',
      optionDropdown: 'statusEnable',
      center: true,
      customWidth: 80,
    },
  ];

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    actions: ['edit', 'view', 'delete'],
  };

  constructor(
    public dialog: MatDialog,
    private managementSizeService: managementSizeService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

    this.managementSizeService.getListSize().subscribe((res) => {
      this.dataTable = res;

      this.dataTable = this.dataTable.filter((x: any) => {
        if (x.status === '1' || x.status === '0') {
          x.status = x.status === '1' ? true : false;
          return x;
        }
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

    this.managementSizeService
      .changeStatusSize(id, { status: data })
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.alertSuccess('Thành công', res.message);
        } else {
          this.alertFailed('Thất bại', res.message);
        }
        this.DataBroadcastService.changeMessage('hideLoadding');
      });
  }

  addNew(data: any, type: string): void {
    const dialogRef = this.dialog.open(AddOrEditSizeComponent, {
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
    //   this.confirmationService.confirm({
    //     message: 'Bạn có muốn xóa danh mục này?',
    //     header: 'Xóa danh mục',
    //     icon: 'pi pi-info-circle',
    //     accept: () => {
    //       this.DataBroadcastService.changeMessage('showLoadding');

    //       this.managementSizeService.deleteCategory(id).subscribe(
    //         (res) => {
    //           if (res.status === 200) {
    //             this.alertSuccess('Thành công', res.message);
    //           } else {
    //             this.alertFailed('Thất bại', res.message);
    //           }
    //           this.DataBroadcastService.changeMessage('hideLoadding');
    //         }
    //       );
    //     },
    //     reject: () => {

    //     }
    // });

    const dialogRef = this.dialog.open(DialogConfirmSizeComponent, {
      width: '400px',
      data: {
        title: 'Xóa size',
        message: 'Bạn có muốn xóa size này?',
        id: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
