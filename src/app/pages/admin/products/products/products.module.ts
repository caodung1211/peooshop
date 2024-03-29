import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmProductComponent } from './dialog-confirm-product/dialog-confirm-product.component';
import { TableNameConfigModule } from 'src/app/components/admin/table-name-config/table-name-config.module';

@NgModule({
  declarations: [
    ProductsComponent,
    DialogConfirmProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        data: {
          breadcrumb: 'Danh sách sản phẩm',
        },
      },
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
    TableNameConfigModule
  ],
})
export class ProductsModule { }
