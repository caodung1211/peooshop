import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageProductsComponent } from './page-products.component';



@NgModule({
  declarations: [
    PageProductsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PageProductsComponent]
})
export class PageProductsModule { }
