import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';

import { MessageService } from 'primeng/api';
import { managementColorService } from '../management-color.service';


@Component({
  selector: 'app-add-or-edit-color',
  templateUrl: './add-or-edit-color.component.html',
  styleUrls: ['./add-or-edit-color.component.scss'],
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
export class AddOrEditColorComponent implements OnInit {
  dataCategory: any;
  header = '';

  constructor(
    public dialogRef: MatDialogRef<AddOrEditColorComponent>,
    private managementColorService: managementColorService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.header = this.data.header;
    if (this.data.data) {
      this.dataCategory = this.data.data;
    } else {
      this.dataCategory = {
        name: '',
        description: '',
        status: true,
      };
    }
  }

  alertSuccess(title:string, detail:string){
    this.messageService.add({ severity: 'success', summary: title, detail: detail, life: 5000});
  }

  alertFailed(title:string, detail:string){
    this.messageService.add({ severity: 'error', summary: title, detail: detail, life: 5000});
  }

  ngOnInit() {}

  onSubmit(type: string) {
    if (type === 'add') {
      this.managementColorService.createSize(this.dataCategory).subscribe(
        (resCreate) => {
          if (resCreate.status === 200) {
            this.alertSuccess('Thành công',resCreate.message)
          } else {
            this.alertFailed('Thất bại',resCreate.message)
          }
        }
      );
    } else {
      this.managementColorService.editSize(
        this.dataCategory.id,
        this.dataCategory
      ).subscribe((resCreate) => {
        if (resCreate.status === 200) {
          this.alertSuccess('Thành công',resCreate.message)
        } else {
          this.alertFailed('Thất bại',resCreate.message)
        }
      });
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }

  hanldeChangeStatus($event:any){
    console.log($event)
  }


}
