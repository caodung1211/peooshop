import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagementColorComponent } from './management-color.component';
import { DialogConfirmColorComponent } from './dialog-confirm-color/dialog-confirm-color.component';

@NgModule({
  declarations: [
    ManagementColorComponent, DialogConfirmColorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementColorComponent,
        data: {
          breadcrumb: 'Danh mục màu',
        },
      },
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ManagementColorModule { }
