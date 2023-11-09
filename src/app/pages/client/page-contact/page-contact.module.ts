import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContactComponent } from './page-contact.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PageContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageContactComponent,
        path: ''
      }
    ])
  ],
  exports: [PageContactComponent]
})
export class PageContactModule { }
