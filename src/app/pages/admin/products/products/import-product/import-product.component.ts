import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng';
import { productsService } from '../products.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

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
    ReactiveFormsModule
  ],
})
export class ImportProductComponent {

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

  userForm: FormGroup; // Declare FormGroup

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ImportProductComponent>,
    private productsService: productsService,
    private messageService: MessageService,
    private DataBroadcastService: DataBroadcastService,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      rate: ['', Validators.required], // Tỉ giá
      urls: this.fb.array([
        this.fb.group({
          link: [''] // Khởi tạo với một giá trị rỗng
        })
      ])
    });
  }

  createLink(): FormGroup {
    return this.fb.group({
      link: ['', Validators.required]
    });
  }

  get linkForms() {
    return this.userForm.get('urls') as FormArray;
  }

  addLink() {
    this.linkForms.push(this.createLink());
  }

  removeLink(index: number) {
    this.linkForms.removeAt(index);
  }

  onSubmit() {
    let payload = {
      rate: this.userForm.value.rate,
      urls: this.userForm.value.urls.map((item: any) => item.link)
    };

    this.DataBroadcastService.changeMessage('showLoadding');

    this.productsService.importProduct(payload).subscribe((res: any) => {
      this.alertSuccess('Thành công', res.message);
      this.DataBroadcastService.changeMessage('hideLoadding');
      this.dialogRef.close(true);
    }, err => {
      this.DataBroadcastService.changeMessage('hideLoadding');

      this.alertFailed('Thất bại', err.error.message);
    })
  }
}
