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

  ngOnInit() {}

  onSubmit() {

    if(this.imgFile){
      const formdata = new FormData();
      formdata.append('image', this.imgFile);
      this.CategoriesService.uploadImage(formdata).subscribe((res) => {
        if(res.status === 200){
          this.dataCategory.avatar = res.url

          this.CategoriesService.createCategory(this.dataCategory).subscribe((resCreate) => {
            if(resCreate.status === 200){
              alert('done ' + resCreate.message)
            }else{
              alert('Faild create' + resCreate.message)
            }
          });

        }else{
          alert('Faild ' + res.message)
        }
      });
    }else{
      this.dataCategory.avatar = this.dataCategory.avatar ? this.dataCategory.avatar : 'https://peooshop.top/wp/wp-content/themes/peooshop/images/no_image.png'

      this.CategoriesService.createCategory(this.dataCategory).subscribe((resCreate) => {
        if(resCreate.status === 200){
          alert('done ' + resCreate.message)
        }else{
          alert('Faild ' + resCreate.message)
        }
      });

    }
    

    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
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
