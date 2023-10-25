import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableNameConfigModule } from 'src/app/components/admin/table-name-config/table-name-config.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { MatSelectModule } from '@angular/material/select';
import { DateActiveCustomPipesModule } from 'src/app/pipes/dataActivePipe.pipe';
import { InputSwitchModule } from 'primeng';
import { ManagementCustomerComponent } from './management-customer.component';
import { AddOrEditCustomerComponent } from './add-or-edit-customer/add-or-edit-customer.component';

@NgModule({
  declarations: [
    ManagementCustomerComponent,AddOrEditCustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ManagementCustomerComponent,
        data: {
          breadcrumb: 'Quản lý khách hàng',
        },
      },
    ]),
    TableBaseLayoutModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    TableNameConfigModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatSlideToggleModule,
    ErrorsMessageModule,
    MatSelectModule,
    DateActiveCustomPipesModule,
    InputSwitchModule
  ],
  providers: [MatDatepickerModule],
})
export class ManagementCustomerModule { }
