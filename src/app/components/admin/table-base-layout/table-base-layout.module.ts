import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseLayoutComponent } from './table-base-layout.component';

@NgModule({
  declarations: [
    TableBaseLayoutComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [TableBaseLayoutComponent]
})
export class TableBaseLayoutModule { }
