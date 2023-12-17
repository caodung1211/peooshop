import {NgModule, Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({name: 'datePipe'})

export class DateCustomPipe implements PipeTransform {
  transform(value: any) {
    return moment(Number(value)).format('HH:mm:ss DD-MM-YYYY');
  }
}

@NgModule({
  imports: [
  ],
  declarations: [ 
    DateCustomPipe
  ],
  exports: [
    DateCustomPipe
  ]
})
export class DateCustomPipePipesModule {}