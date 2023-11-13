import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCheckoutComponent } from './page-checkout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';



@NgModule({
  declarations: [
    PageCheckoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
       component: PageCheckoutComponent,
       path: '' 
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    ErrorsMessageModule,
    SharedPipeModule
  ],
  exports: [PageCheckoutComponent]
})
export class PageCheckoutModule { }
