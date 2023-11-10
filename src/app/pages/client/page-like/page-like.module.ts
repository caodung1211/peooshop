import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLikeComponent } from './page-like.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageLikeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageLikeComponent,
        path: ''
      }
    ]),
  ],
  exports: [PageLikeComponent]
})
export class PageLikeModule { }
