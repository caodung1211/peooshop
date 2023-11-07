import { NgModule } from '@angular/core';
import { PriceCustomPipe } from '../pipes/pricePipe.pipe';

@NgModule({
  declarations: [PriceCustomPipe],
  exports: [PriceCustomPipe],
})
export class SharedPipeModule { }