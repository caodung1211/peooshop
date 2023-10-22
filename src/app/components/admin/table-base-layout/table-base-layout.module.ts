import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBaseLayoutComponent } from './table-base-layout.component';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DropdownModule, InputSwitchModule, InputTextModule, TableModule, TooltipModule } from 'primeng';
import { DateCustomPipe } from 'src/app/pipes/dataPipe.pipe';
import { PriceCustomPipe } from 'src/app/pipes/pricePipe.pipe';

@NgModule({
  declarations: [
    TableBaseLayoutComponent,
    DateCustomPipe,PriceCustomPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    InputSwitchModule,
    TableModule,
    TooltipModule,
    InputTextModule,
    DropdownModule
  ],
  exports: [TableBaseLayoutComponent],
  // providers: [DateCustomPipe,PriceCustomPipe]
})
export class TableBaseLayoutModule { }
