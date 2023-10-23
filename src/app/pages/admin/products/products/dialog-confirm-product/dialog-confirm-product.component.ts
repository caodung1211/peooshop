import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { productsService } from '../products.service';

@Component({
  selector: 'app-dialog-confirm-product',
  templateUrl: './dialog-confirm-product.component.html',
  styleUrls: ['./dialog-confirm-product.component.scss']
})
export class DialogConfirmProductComponent {

  title: string;
  message: string;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmProductComponent>,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private productsService: productsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
    this.title = data.title;
    this.message = data.message;
    this.id = data.id;
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

  onConfirm(): void {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.productsService.deleteProduct(this.id).subscribe((res) => {
      if (res.status === 200) {
        this.dialogRef.close(true);
        this.alertSuccess('Thành công', res.message);
        this.DataBroadcastService.changeMessage('hideLoadding');
      } else {
        this.alertFailed('Thất bại', res.message);
        this.DataBroadcastService.changeMessage('hideLoadding');
      }
    });
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
