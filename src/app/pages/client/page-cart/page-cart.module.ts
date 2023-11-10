import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCartComponent } from './page-cart.component';
import { RouterModule } from '@angular/router';


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
  ],
  exports: [PageCartComponent]
})
export class PageCartModule { }
