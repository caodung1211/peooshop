import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list.component';
import { RouterModule } from '@angular/router';
import { TableNameConfigModule } from 'src/app/components/admin/table-name-config/table-name-config.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { DialogConfirmOrderComponent } from './dialog-confirm-order/dialog-confirm-order.component';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrdersListComponent,
    DialogConfirmOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrdersListComponent
      }
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
    TableNameConfigModule,
    SharedPipeModule,
    FormsModule
  ],
  exports: [OrdersListComponent]
})
export class OrdersListModule { }
