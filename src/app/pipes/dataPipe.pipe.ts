import {Pipe, PipeTransform} from '@angular/core';
import moment from 'moment';

@Pipe({name: 'datePipe'})

export class DateCustomPipe implements PipeTransform {
  transform(value: any) {
    return moment(Number(value)).format('HH:mm:ss M/D/YYYY');
  }
}
