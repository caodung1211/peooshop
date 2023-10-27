import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { productsService } from './products.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MessageService } from 'primeng';
import { IConfigTableBase } from 'src/app/components/admin/table-base-layout/table-base-layout.model';
import { AddOrEditProductComponent } from './add-or-edit-product/add-or-edit-product.component';
import { DialogConfirmProductComponent } from './dialog-confirm-product/dialog-confirm-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  columns: any = [];

  dataTable: any = [];

  tableName = 'TABLE_PRODUCTS';

  config: IConfigTableBase = {
    checkbox: true,
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
    private productsService: productsService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  handleColumns(columns: any) {
    this.columns = columns.map((x: any) => {
      if (x.field === 'name') {
        x.customWidth = 100;
      }
      return x;
    });
  }

  loadData() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.productsService.getListCategory().subscribe((resCategory) => {
      this.optionCustomize.dropdownCategory = []
      this.optionCustomize.dropdownCategory.push({label: "Tất cả", value: null})
      resCategory.map((x:any)=>{
        this.optionCustomize.dropdownCategory.push({label: x.name, value: x.name, id: x.id})
      })

      this.productsService.getListSize().subscribe((resSize) => {
        this.optionCustomize.dropdownSize = []
        this.optionCustomize.dropdownSize.push({label: "Tất cả", value: null})
        resSize.map((x:any)=>{
          this.optionCustomize.dropdownSize.push({label: x.name, value: x.name, id: x.id})
        })

        this.productsService.getListColor().subscribe((resColor) => {
          this.optionCustomize.dropdownColor = []
          this.optionCustomize.dropdownColor.push({label: "Tất cả", value: null})
          resColor.map((x:any)=>{
            this.optionCustomize.dropdownColor.push({label: x.name, value: x.name, id: x.id})
          })

          this.productsService.getListProduct().subscribe((res) => {
            this.dataTable = res;

            this.dataTable.map((x: any) => {
              let temp: any = [];
              this.optionCustomize.dropdownCategory.map((category: any) => {
                x.category.split(',').map((z: any) => {
                  if (z === category.id) {
                    temp.push(category.label);
                  }
                  return z;
                });
                return category;
              });

              x.category = temp;
              return x;
            });

            this.dataTable.map((x: any) => {
              let temp: any = [];
              this.optionCustomize.dropdownSize.map((size: any) => {
                x.size.split(',').map((z: any) => {
                  if (z === size.id) {
                    temp.push(size.label);
                  }
                  return z;
                });
                return size;
              });

              x.size = temp;
              return x;
            });

            this.dataTable.map((x: any) => {
              let temp: any = [];
              this.optionCustomize.dropdownColor.map((color: any) => {
                x.color.split(',').map((z: any) => {
                  if (z === color.id) {
                    temp.push(color.label);
                  }
                  return z;
                });
                return color;
              });

              x.color = temp;
              return x;
            });



            this.dataTable = this.dataTable.filter((x: any) => {
              if (x.status === '1' || x.status === '0') {
                x.status = x.status === '1' ? true : false;
                x.sale = x.sale === '1' ? true : false;
                return x;
              }
            });

            this.DataBroadcastService.changeMessage('hideLoadding');
          });
        });
      });
    },errCate=>{
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
      case 'sale':
        this.changeStatus(event.type, event.id, event.data);
        break;
      default:
        break;
    }
  }

  changeStatus(type:string, id: string, data: any) {
    this.DataBroadcastService.changeMessage('showLoadding');

    let payload = {
      [type]: data,
      type: type
    }

    this.productsService
      .changeStatusProduct(id, payload)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.DataBroadcastService.changeAlert({
            type: "success",
            title:"Thành công",
            message: res.message
          });
        } else {
          this.DataBroadcastService.changeAlert({
            type: "error",
            title:"Thất bại",
            message: res.message
          });
        }
        this.DataBroadcastService.changeMessage('hideLoadding');
      });
  }

  addNew(data: any, type: string): void {
    const dialogRef = this.dialog.open(AddOrEditProductComponent, {
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
          id: data.id,
          listSize: this.optionCustomize.dropdownSize,
          listCategory: this.optionCustomize.dropdownCategory,
          listColor: this.optionCustomize.dropdownColor,
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
    const dialogRef = this.dialog.open(DialogConfirmProductComponent, {
      width: '400px',
      data: {
        title: 'Xóa sản phẩm',
        message: 'Bạn có muốn xóa sản phẩm này?',
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
