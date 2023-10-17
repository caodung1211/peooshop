import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseLayoutComponent } from './table-base-layout.component';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    TableBaseLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [TableBaseLayoutComponent]
})
export class TableBaseLayoutModule { }
