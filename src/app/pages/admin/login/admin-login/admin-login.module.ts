import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageService, ToastModule } from 'primeng';



@NgModule({
  declarations: [
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLoginComponent,
        data: {
          breadcrumb: 'Đăng nhập',
        }
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class AdminLoginModule { }
