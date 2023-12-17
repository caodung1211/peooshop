import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { ordersService } from './orders-list.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MessageService } from 'primeng';
import { DialogConfirmOrderComponent } from './dialog-confirm-order/dialog-confirm-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {

  columns: any = [];

  dataTable: any = [];

  tableName = 'TABLE_ORDERS';

  config: IConfigTableBase = {
    checkbox: false,
    stt: true,
    actions: ['edit', 'view', 'delete'],
  };

  listCategory: any = [];
  listSize: any = [];
  listColor: any = [];

  showColumns = false;

  optionCustomize:any = {
    dropdownCategory: [],
    dropdownSize: [],
    dropdownColor: []
  }

  constructor(
    public dialog: MatDialog,
    private ordersService: ordersService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData()
  }

  handleColumns(columns: any) {
    this.columns = columns.map((x: any) => {
      if (x.field === 'name') {
        x.customWidth = 200;
      }
      if (x.field === 'status_order') {
        x.customWidth = 170;
      }
      return x;
    });
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.ordersService.getListOrder().subscribe((res) => {
      this.dataTable = res.data;

      this.dataTable.map((x: any) => {
        if(x.status_order === 1){
          x.status_order = "Chờ xử lý";
        }else if(x.status_order === 2){
          x.status_order = "Đang xử lý";
        }else if(x.status_order === 3){
          x.status_order = "Đang giao hàng";
        }else if(x.status_order === 4){
          x.status_order = "Hoàn thành";
        }else if(x.status_order === 0){
          x.status_order = "Hủy";
        }
        x.created_by = x.author;
        x.update_by = x.author_update;

        
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
        this.router.navigate(['/admin/orders/list/',event.data.orderId]);
        
        break;
      case 'delete':
        if(event.data.status_order === "Hủy"){
          this.removeItems(event.data.orderId);
        }else{
          this.DataBroadcastService.changeAlert({
            type: "error",
            title:"Thất bại",
            message: "Chỉ được phép xóa đơn hàng ở trạng thái HỦY"
          });
        }
        break;
      case 'status_order':
        this.changeStatus(event.id, event.data);
        break;
      default:
        break;
    }
  }

  changeStatus(id: number, data: number) {
    this.DataBroadcastService.changeMessage('showLoadding');
    this.ordersService
      .changeStatusOrder(id, {status: data})
      .subscribe((res: any) => {
          this.DataBroadcastService.changeAlert({
            type: "success",
            title:"Thành công",
            message: res.message
          });
          this.DataBroadcastService.changeMessage('hideLoadding');
          this.loadData()

        }, err=> {
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
    // const dialogRef = this.dialog.open(EditOrderComponent, {
    //   width: '70%',
    //   height: '90vh',
    //   data: {
    //     type: type,
    //     header:
    //       type === 'add'
    //         ? 'Thêm mới'
    //         : type === 'view'
    //         ? 'Xem chi tiết'
    //         : 'Chỉnh sửa',
    //     data: {
    //       id: data.orderId,
    //     },
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.loadData();
    //   }
    // });
  }

  removeItems(id: string): void {
    const dialogRef = this.dialog.open(DialogConfirmOrderComponent, {
      width: '400px',
      data: {
        title: 'Xóa đơn hàng',
        message: 'Bạn có muốn xóa đơn hàng này?',
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
}
