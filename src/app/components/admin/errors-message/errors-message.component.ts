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
    this.control.valueChanges.subscribe((res:any)=>{
      if(this.control.errors){
        this.getMessage(Object.keys(this.control.errors)[0],this.name)
      }
    })
    
  }


  getMessage(control:any, name:any){
    switch (control) {
      case 'required':
        this.message = name + ' là bắt buộc!'
        break;
    
      default:
        break;
    }
  }

}
