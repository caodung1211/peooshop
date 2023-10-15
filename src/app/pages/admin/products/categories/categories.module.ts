import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { TableBaseLayoutModule } from 'src/app/components/admin/table-base-layout/table-base-layout.module';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: CategoriesComponent }
    ]),
    TableBaseLayoutModule
  ]
})
export class CategoriesModule { }
