import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSearchResultsComponent } from './page-search-results.component';
import { RouterModule } from '@angular/router';
import { ListProductClientModule } from 'src/app/components/client/list-product-client/list-product-client.module';

@NgModule({
  declarations: [
    PageSearchResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageSearchResultsComponent,
        path: ''
      }
    ]),
    ListProductClientModule
  ]
})
export class PageSearchResultsModule { }
