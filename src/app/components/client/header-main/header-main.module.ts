import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMainComponent } from './header-main.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderMainComponent]
})
export class HeaderMainModule { }
