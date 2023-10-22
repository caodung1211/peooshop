import { Component, Inject } from '@angular/core';
import { MessageService } from 'primeng';
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
  ],
})
export class AddOrEditProductComponent {
  currentData: any;
  product_id = '';
  header = '';
  imgFile: any;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditProductComponent>,
    private productsService: productsService,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product_id = this.data.data.id;

    this.header = this.data.header;
    if (this.data.data.id) {
      this.loadData(this.product_id);
    } else {
      this.currentData = {
        product_id: '',
        name: '',
        description: '',
        category: '',
        avatar: '',
        sale: '',
        status: '',
        stock_status: '',
        quantity: '',
        color: '',
        size: '',
        price_cost: '',
        price: '',
        price_collab: '',
        price_sale: '',
        date_update: '',
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
    this.productsService.getDetailProduct(id).subscribe((res) => {
      console.log(res);
      this.currentData =res
    });
  }

  onSubmit(type: string) {
    this.dialogRef.close(true);
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
