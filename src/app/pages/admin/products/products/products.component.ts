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
  columns = [
    {
      field: 'name',
      header: 'Tên',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
      customWidth: 150,
    },
    {
      field: 'avatar',
      header: 'Ảnh đại diện',
      visible: true,
      typeFilter: '',
      showFilter: false,
      type: 'image',
      customWidth: 150,
      center: true,
    },

    {
      field: 'price_cost',
      header: 'Giá nhập',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'price',
      center: true,
    },
    {
      field: 'price',
      header: 'Giá',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'price',
      center: true,
    },
    {
      field: 'price_collab',
      header: 'Giá CTV',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'price',
      center: true,
    },
    {
      field: 'price_sale',
      header: 'Giá khuyến mãi',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'price',
      center: true,
    },
    {
      field: 'category',
      header: 'Danh mục',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'color',
      header: 'Màu',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'size',
      header: 'Kích thước',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'stock_status',
      header: 'Tình trạng',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'text',
      center: true,
    },
    {
      field: 'quantity',
      header: 'Số lượng',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'number',
      center: true,
      customWidth: 60,
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
      field: 'sale',
      header: 'Khuyến mãi',
      visible: true,
      typeFilter: 'dropdown',
      showFilter: true,
      type: 'switch',
      optionDropdown: 'statusEnable',
      center: true,
      customWidth: 80,
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
    {
      field: 'date_update',
      header: 'Ngày cập nhật',
      visible: true,
      typeFilter: 'text',
      showFilter: true,
      type: 'date',
      center: true,
    },
  ];

  dataTable: any = [];

  config: IConfigTableBase = {
    checkbox: true,
    stt: true,
    actions: ['edit', 'view', 'delete'],
  };

  listCategory:any = []
  listSize:any = []

  constructor(
    public dialog: MatDialog,
    private productsService: productsService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService
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

    this.productsService.getListCategory().subscribe(resCategory=>{
      this.listCategory = resCategory

      this.productsService.getListSize().subscribe(resSize=>{
        this.listSize = resSize

        this.productsService.getListProduct().subscribe((res) => {
          this.dataTable = res

          this.dataTable.map((x:any)=>{
            let temp:any = []
            this.listCategory.map((category:any)=>{
              x.category.split(',').map((z:any)=>{
                if(z === category.id){
                  temp.push(category.name)
                }
                return z
              })
              return category
            })
    
            x.category = temp
            return x
          })

          this.dataTable.map((x:any)=>{
            let temp:any = []
            this.listSize.map((size:any)=>{
              x.size.split(',').map((z:any)=>{
                if(z === size.id){
                  temp.push(size.name)
                }
                return z
              })
              return size
            })
    
            x.size = temp
            return x
          })
    
          this.dataTable = this.dataTable.filter((x: any) => {
            if (x.status === '1' || x.status === '0') {
              x.status = x.status === '1' ? true : false;
              return x;
            }
          });
    
          this.DataBroadcastService.changeMessage('hideLoadding');
        });
      })
    })
    

   
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

    this.productsService
      .changeStatusProduct(id, { status: data })
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
    const dialogRef = this.dialog.open(AddOrEditProductComponent, {
      width: '70%',
      data: {
        type: type,
        header:
          type === 'add'
            ? 'Thêm mới'
            : type === 'view'
            ? 'Xem chi tiết'
            : 'Chỉnh sửa',
        data: {
          id: data.product_id,
          listSize: this.listSize,
          listCategory: this.listCategory
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
    //   this.confirmationService.confirm({
    //     message: 'Bạn có muốn xóa danh mục này?',
    //     header: 'Xóa danh mục',
    //     icon: 'pi pi-info-circle',
    //     accept: () => {
    //       this.DataBroadcastService.changeMessage('showLoadding');

    //       this.productsService.deleteCategory(id).subscribe(
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

    const dialogRef = this.dialog.open(DialogConfirmProductComponent, {
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
