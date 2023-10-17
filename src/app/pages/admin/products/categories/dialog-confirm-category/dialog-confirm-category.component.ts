import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-category',
  templateUrl: './dialog-confirm-category.component.html',
  styleUrls: ['./dialog-confirm-category.component.scss']
})
export class DialogConfirmCategoryComponent {
  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<DialogConfirmCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    this.message = data.message;
  }
 
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}