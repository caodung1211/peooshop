import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageCollabComponent } from './page-collab.component';

@NgModule({
  declarations: [
    PageCollabComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageCollabComponent,
        path: ''
      }
    ]),
  ],
  exports: [PageCollabComponent]
})
export class PageCollabModule { }