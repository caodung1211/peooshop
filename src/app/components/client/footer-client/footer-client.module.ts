import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterClientComponent } from './footer-client.component';



@NgModule({
  declarations: [
    FooterClientComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FooterClientComponent]
})
export class FooterClientModule { }
