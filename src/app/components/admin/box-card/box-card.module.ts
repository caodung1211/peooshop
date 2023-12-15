import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxCardComponent } from './box-card.component';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';



@NgModule({
  declarations: [
    BoxCardComponent
  ],
  imports: [
    CommonModule,
    SharedPipeModule
  ],
  exports: [BoxCardComponent]
})
export class BoxCardModule { }
