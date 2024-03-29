import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng';
import { productsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ErrorsMessageModule,
  ],
})
export class ImportProductComponent {

  data: any = {}

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

  constructor(
    public dialogRef: MatDialogRef<ImportProductComponent>,
    private productsService: productsService,
    private messageService: MessageService,
    private DataBroadcastService: DataBroadcastService,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSubmit() {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.productsService.importProduct(this.data).subscribe((res: any) => {
      this.alertSuccess('Thành công', res.message);
      this.DataBroadcastService.changeMessage('hideLoadding');
      this.dialogRef.close(true);
    }, err => {
      this.DataBroadcastService.changeMessage('hideLoadding');

      this.alertFailed('Thất bại', err.error.message);
    })
  }
}
