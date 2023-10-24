import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng';

@NgModule({
  declarations: [LibraryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LibraryComponent,
        data: {
          breadcrumb: 'Danh sách hình ảnh',
        },
      },
    ]),
    MatButtonModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService]
})
export class LibraryModule {}
