import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { managementCollabService } from '../management-collab.service';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';

@Component({
  selector: 'app-dialog-confirm-collab',
  templateUrl: './dialog-confirm-collab.component.html',
  styleUrls: ['./dialog-confirm-collab.component.scss']
})
export class DialogConfirmCollabComponent {
  title: string;
  message: string;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmCollabComponent>,
    private DataBroadcastService: DataBroadcastService,
    private managementCollabService: managementCollabService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
    this.title = data.title;
    this.message = data.message;
    this.id = data.id;
  }

  onConfirm(): void {
    this.DataBroadcastService.changeMessage('showLoadding');

    this.managementCollabService.deleteCustomer(this.id).subscribe((res) => {
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
