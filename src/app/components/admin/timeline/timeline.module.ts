import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { DateCustomPipePipesModule } from 'src/app/pipes/dataPipe.pipe';



@NgModule({
  declarations: [
    TimelineComponent
  ],
  imports: [
    CommonModule,
    DateCustomPipePipesModule
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
