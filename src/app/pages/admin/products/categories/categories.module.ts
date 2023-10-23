import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfirmCategoryComponent } from './dialog-confirm-category/dialog-confirm-category.component';
import { ConfirmationService } from 'primeng';
import { TableNameConfigModule } from 'src/app/components/admin/table-name-config/table-name-config.module';

@NgModule({
  declarations: [CategoriesComponent, DialogConfirmCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoriesComponent,
        data: {
          breadcrumb: 'Danh mục sản phẩm',
        },
      },
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TableNameConfigModule
  ],
  providers: [ConfirmationService]
})
export class CategoriesModule {}
