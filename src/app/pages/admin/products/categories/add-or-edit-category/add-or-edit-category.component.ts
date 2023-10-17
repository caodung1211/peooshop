import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-or-edit-category',
  templateUrl: './add-or-edit-category.component.html',
  styleUrls: ['./add-or-edit-category.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AddOrEditCategoryComponent implements OnInit {

  dataCategory:any

  constructor(public dialogRef: MatDialogRef<AddOrEditCategoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
    if(this.data.data){
      this.dataCategory = this.data.data
    }
  }

  ngOnInit() {
    console.log(this.dataCategory)
    
  }

  onSubmit(){

  }
}
