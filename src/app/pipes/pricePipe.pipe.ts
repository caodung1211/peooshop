import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'pricePipe'})

export class PriceCustomPipe implements PipeTransform {
  transform(value: any) {
    return Number(value).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
  }
}
