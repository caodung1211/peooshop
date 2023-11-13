import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoginComponent } from './page-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MessageService, ToastModule } from 'primeng';


@NgModule({
  declarations: [
    PageLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  exports: [PageLoginComponent]
})
export class PageLoginModule { }
