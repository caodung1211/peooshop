import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { ListProductClientComponent } from './list-product-client.component';

@NgModule({
  declarations: [ListProductClientComponent],
  imports: [CommonModule, TooltipModule, SharedPipeModule],
  exports: [ListProductClientComponent],
})
export class ListProductClientModule {}
