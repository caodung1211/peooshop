import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { managementSizeService } from '../management-size.service';

@Component({
  selector: 'app-dialog-confirm-size',
  templateUrl: './dialog-confirm-size.component.html',
  styleUrls: ['./dialog-confirm-size.component.scss'],
})
export class DialogConfirmSizeComponent {
  title: string;
  message: string;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmSizeComponent>,
    private DataBroadcastService: DataBroadcastService,
    private messageService: MessageService,
    private managementSizeService: managementSizeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

    this.managementSizeService.deleteSize(this.id).subscribe((res) => {
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

    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
