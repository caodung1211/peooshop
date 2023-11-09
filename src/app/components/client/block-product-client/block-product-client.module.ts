import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginatorModule} from 'primeng/paginator';
import { BlockProductClientComponent } from './block-product-client.component';

@NgModule({
  declarations: [BlockProductClientComponent],
  imports: [CommonModule, TooltipModule, SharedPipeModule,MatPaginatorModule,PaginatorModule],
  exports: [BlockProductClientComponent],
})
export class BlockProductClientModule {}
