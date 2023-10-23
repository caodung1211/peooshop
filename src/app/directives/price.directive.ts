import {Directive} from '@angular/core';

@Directive({
    selector: '[nhFormatInput]',
    host: {
        '(blur)': 'onBlur()',
    }
})
export class nhFormatInputDirective {
    transform(value: any) {
        return Number(value).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
    }
}
