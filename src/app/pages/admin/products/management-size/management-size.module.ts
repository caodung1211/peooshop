import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementSizeComponent } from './management-size.component';
import { RouterModule } from '@angular/router';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng';
import { DialogConfirmSizeComponent } from './dialog-confirm-size/dialog-confirm-size.component';
import { TableNameConfigModule } from 'src/app/components/admin/table-name-config/table-name-config.module';

@NgModule({
  declarations: [
    ManagementSizeComponent, DialogConfirmSizeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementSizeComponent,
        data: {
          breadcrumb: 'Danh mục size',
        },
      },
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
    TableNameConfigModule
  ],
  providers: [ConfirmationService]
})
export class ManagementSizeModule { }
