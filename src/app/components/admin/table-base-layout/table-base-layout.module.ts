import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseLayoutComponent } from './table-base-layout.component';
import {FormsModule} from '@angular/forms';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
    TableBaseLayoutComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    InputSwitchModule,
    FormsModule
  ],
  exports: [TableBaseLayoutComponent]
})
export class TableBaseLayoutModule { }
