import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSearchResultsComponent } from './page-search-results.component';
import { RouterModule } from '@angular/router';

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
  ]
})
export class PageSearchResultsModule { }
