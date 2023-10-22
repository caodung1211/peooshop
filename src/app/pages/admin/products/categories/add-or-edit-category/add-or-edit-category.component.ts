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
import { CategoriesService } from '../categories.service';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss'],
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
export class AddOrEditCategoryComponent implements OnInit {
  dataCategory: any;
  header = '';
  imgFile: any;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditCategoryComponent>,
    private CategoriesService: CategoriesService,
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
        avatar: '',
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
    if (this.imgFile) {
      const formdata = new FormData();
      formdata.append('image', this.imgFile);
      this.CategoriesService.uploadImage(formdata).subscribe((res) => {
        if (res.status === 200) {
          this.dataCategory.avatar = res.url;

          if (type === 'add') {
            this.CategoriesService.createCategory(this.dataCategory).subscribe(
              (resCreate) => {
                if (resCreate.status === 200) {
                  this.alertSuccess('Thành công',resCreate.message)
                } else {
                  this.alertFailed('Thất bại',resCreate.message)
                }
              }
            );
          } else {
            this.CategoriesService.editCategory(
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
        } else {
          this.alertFailed('Thất bại',res.message)
        }
      });
    } else {
      this.dataCategory.avatar = this.dataCategory.avatar
        ? this.dataCategory.avatar
        : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png';

      if (type === 'add') {
        this.CategoriesService.createCategory(this.dataCategory).subscribe(
          (resCreate) => {
            if (resCreate.status === 200) {
              this.alertSuccess('Thành công',resCreate.message)
            } else {
              this.alertFailed('Thất bại',resCreate.message)
            }
          }
        );
      } else {
        this.CategoriesService.editCategory(
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
    }

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }

  hanldeChangeStatus($event:any){
    console.log($event)
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
    this.dataCategory.avatar = reader.result;
  }
}
