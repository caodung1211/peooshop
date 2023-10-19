import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsMessageComponent } from './errors-message.component';



@NgModule({
  declarations: [ErrorsMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [ErrorsMessageComponent]
})
export class ErrorsMessageModule { }
