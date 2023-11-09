import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLocalBrandComponent } from './page-local-brand.component';
import { ListProductClientModule } from 'src/app/components/client/list-product-client/list-product-client.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarCatgoryModule } from 'src/app/components/client/sidebar-catgory/sidebar-catgory.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PageLocalBrandComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageLocalBrandComponent,
        path: ''
      }
    ]),
    ListProductClientModule,
    FormsModule,
    SidebarCatgoryModule
  ],
  exports: [PageLocalBrandComponent]
})
export class PageLocalBrandModule { }