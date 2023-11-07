import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageProductsComponent } from './page-products.component';
import { RouterModule } from '@angular/router';
import { ListProductClientModule } from 'src/app/components/client/list-product-client/list-product-client.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarCatgoryModule } from 'src/app/components/client/sidebar-catgory/sidebar-catgory.module';



@NgModule({
  declarations: [
    PageProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageProductsComponent,
        path: ''
      }
    ]),
    ListProductClientModule,
    FormsModule,
    SidebarCatgoryModule
  ],
  exports: [PageProductsComponent]
})
export class PageProductsModule { }
