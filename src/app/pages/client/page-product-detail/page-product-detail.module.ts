import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageProductDetailComponent } from '../page-product-detail/page-product-detail.component';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { DialogModule } from 'primeng';

@NgModule({
  declarations: [
    PageProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageProductDetailComponent,
        path: ':id',
      }
    ]),
    FormsModule,
    SharedPipeModule,
    DialogModule
  ],
  exports: [PageProductDetailComponent]
})
export class PageProductDetailModule { }
