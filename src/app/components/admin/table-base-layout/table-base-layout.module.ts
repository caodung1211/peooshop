import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseLayoutComponent } from './table-base-layout.component';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    TableBaseLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TableModule
  ],
  exports: [TableBaseLayoutComponent]
})
export class TableBaseLayoutModule { }
