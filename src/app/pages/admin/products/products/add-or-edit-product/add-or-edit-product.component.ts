import { Component, Inject } from '@angular/core';
import { InputSwitchModule, MessageService } from 'primeng';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { productsService } from '../products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-or-edit-product',
  templateUrl: './add-or-edit-product.component.html',
  styleUrls: ['./add-or-edit-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ErrorsMessageModule,
    InputSwitchModule,
    MatSelectModule,
  ],
})
export class AddOrEditProductComponent {
  currentData: any = {};
  product_id = '';
  header = '';
  imgFile: any;

  optionDropdow: any = {
    stock: [
      { label: 'Còn hàng', value: '1' },
      { label: 'Hết hàng', value: '0' },
    ],
    category: [],
    size: [],
    color: [],
  };

  tempCategory:any = []
  tempSize:any = []
  tempColor:any = []


  constructor(
    public dialogRef: MatDialogRef<AddOrEditProductComponent>,
    private productsService: productsService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product_id = this.data.data.id;
    this.header = this.data.header;

    this.data.data.listCategory.map((x: any) => {
      this.optionDropdow.category.push({
        label: x.name,
        value: x.id,
      });
      return x;
    });

    this.data.data.listSize.map((x: any) => {
      this.optionDropdow.size.push({
        label: x.name,
        value: x.id,
      });
      return x;
    });

    this.data.data.listColor.map((x: any) => {
      this.optionDropdow.color.push({
        label: x.name,
        value: x.id,
      });
      return x;
    });

    if (this.data.data.id) {
      this.loadData(this.product_id);
    } else {
      this.currentData = {
        product_id: '',
        name: '',
        description: '',
        category: '',
        avatar: '',
        sale: false,
        status: true,
        stock_status: '',
        quantity: '',
        color: '',
        size: '',
        price_cost: '',
        price: '',
        price_collab: '',
        price_sale: ''
      };
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

  ngOnInit() {}

  loadData(id: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.productsService.getDetailProduct(id).subscribe((res) => {
      this.currentData = res;

      this.tempCategory = this.currentData.category.split(',');
      this.tempSize = this.currentData.size.split(',');
      this.tempColor = this.currentData.color.split(',');

      this.currentData.status = this.currentData.status === '1' ? true : false;
      this.currentData.sale = this.currentData.sale === '1' ? true : false;
      this.DataBroadcastService.changeMessage('hideLoadding');
    });
  }

  onSubmit(type: string) {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.currentData.category = this.tempCategory.toString();
    this.currentData.size = this.tempSize.toString();
    this.currentData.color = this.tempColor.toString();

    if (this.imgFile) {
      const formdata = new FormData();
      formdata.append('image', this.imgFile);
      this.productsService.uploadImage(formdata).subscribe((res) => {
        if (res.status === 200) {
          this.currentData.avatar = res.url;

          if (type === 'add') {
            this.productsService
              .createProduct(this.currentData)
              .subscribe((resCreate) => {
                if (resCreate.status === 200) {
                  this.dialogRef.close(true);
                  this.alertSuccess('Thành công', resCreate.message);
                  this.DataBroadcastService.changeMessage('hideLoadding');
                } else {
                  this.DataBroadcastService.changeMessage('hideLoadding');

                  this.alertFailed('Thất bại', resCreate.message);
                }
              });
          } else {
            this.productsService
              .editProduct(this.product_id, this.currentData)
              .subscribe((resCreate) => {
                if (resCreate.status === 200) {
                  this.DataBroadcastService.changeMessage('hideLoadding');
                  this.dialogRef.close(true);
                  this.alertSuccess('Thành công', resCreate.message);
                } else {
                  this.DataBroadcastService.changeMessage('hideLoadding');

                  this.alertFailed('Thất bại', resCreate.message);
                }
              });
          }
        } else {
          this.DataBroadcastService.changeMessage('hideLoadding');

          this.alertFailed('Thất bại', res.message);
        }
      });
    } else {
      this.currentData.avatar = this.currentData.avatar
        ? this.currentData.avatar
        : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png';

      if (type === 'add') {
        this.productsService
          .createProduct(this.currentData)
          .subscribe((resCreate) => {
            if (resCreate.status === 200) {
              this.DataBroadcastService.changeMessage('hideLoadding');
              this.dialogRef.close(true);
              this.alertSuccess('Thành công', resCreate.message);
            } else {
              this.DataBroadcastService.changeMessage('hideLoadding');

              this.alertFailed('Thất bại', resCreate.message);
            }
          });
      } else {
        this.productsService
          .editProduct(this.product_id, this.currentData)
          .subscribe((resCreate) => {
            if (resCreate.status === 200) {
              this.DataBroadcastService.changeMessage('hideLoadding');
              this.dialogRef.close(true);
              this.alertSuccess('Thành công', resCreate.message);
            } else {
              this.DataBroadcastService.changeMessage('hideLoadding');

              this.alertFailed('Thất bại', resCreate.message);
            }
          });
      }
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  hanldeChangeStatus($event: any) {
    console.log($event);
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imgFile = e.target.files[0];
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.currentData.avatar = reader.result;
  }
}
