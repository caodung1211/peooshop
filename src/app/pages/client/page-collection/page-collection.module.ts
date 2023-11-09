
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageCollectionComponent } from './page-collection.component';


@NgModule({
  declarations: [
    PageCollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageCollectionComponent,
        path: ''
      }
    ])
  ],
  exports: [PageCollectionComponent]
})
export class PageCollectionModule { }
