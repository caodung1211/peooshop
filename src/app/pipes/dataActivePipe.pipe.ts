import {NgModule, Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({name: 'dateActivePipe'})

export class DateActiveCustomPipe implements PipeTransform {
  transform(value: any) {
    if(value){
      return moment(Number(value)).startOf('milliseconds').fromNow()
    }else{
      return "No Data"
    }
  }
}


@NgModule({
  imports: [
  ],
  declarations: [ 
    DateActiveCustomPipe
  ],
  exports: [
    DateActiveCustomPipe
  ]
})
export class DateActiveCustomPipesModule {}