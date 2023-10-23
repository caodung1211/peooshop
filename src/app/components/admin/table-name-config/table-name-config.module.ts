import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableNameConfigComponent } from './table-name-config.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule, DialogModule } from 'primeng';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    TableNameConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    MatButtonModule
  ],
  exports: [TableNameConfigComponent]
})
export class TableNameConfigModule { }
