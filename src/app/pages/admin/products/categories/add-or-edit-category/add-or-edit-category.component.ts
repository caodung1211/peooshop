import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { Inject } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
    MatButtonModule
  ],
})
export class AddOrEditCategoryComponent implements OnInit {

  dataCategory:any
  header = ''

  constructor(public dialogRef: MatDialogRef<AddOrEditCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    this.header = this.data.header
    if(this.data.data){
      this.dataCategory = this.data.data
    }else{
      this.dataCategory = {}
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.dataCategory)

    this.dialogRef.close(true);
  }

  cancel(){
    this.dialogRef.close();
  }

  handleInputChange(e:any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    this.dataCategory.avatar = reader.result;
  }
}