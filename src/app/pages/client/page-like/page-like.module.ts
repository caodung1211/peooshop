import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLikeComponent } from './page-like.component';
import { RouterModule } from '@angular/router';
import { ListProductClientModule } from 'src/app/components/client/list-product-client/list-product-client.module';



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
    ListProductClientModule
  ],
  exports: [PageLikeComponent]
})
export class PageLikeModule { }
