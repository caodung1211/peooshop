import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-errors-message',
  templateUrl: './errors-message.component.html',
  styleUrls: ['./errors-message.component.scss']
})
export class ErrorsMessageComponent implements OnChanges {
  @Input() control:any
  @Input() name:any
  
  message = ''

  ngOnChanges(changes: SimpleChanges) {
    
    if(this.control?.touch) this.getMessage(Object?.keys(this.control.errors),this.name)
  }


  getMessage(control:any, name:any){
    console.log(control)
    switch (control) {
      case 'required':
        this.message = name + ' bắt buộc!'
        break;
    
      default:
        break;
    }
  }

}
