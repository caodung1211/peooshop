import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { ListProductClientComponent } from './list-product-client.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [ListProductClientComponent],
  imports: [CommonModule, TooltipModule, SharedPipeModule,MatPaginatorModule,PaginatorModule],
  exports: [ListProductClientComponent],
})
export class ListProductClientModule {}
