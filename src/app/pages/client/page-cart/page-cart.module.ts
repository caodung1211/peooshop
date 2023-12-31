import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCartComponent } from './page-cart.component';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng';


@NgModule({
  declarations: [
    PageCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageCartComponent,
        path: ''
      }
    ]),
    SharedPipeModule,
    FormsModule,
    DialogModule
  ],
  exports: [PageCartComponent]
})
export class PageCartModule { }
