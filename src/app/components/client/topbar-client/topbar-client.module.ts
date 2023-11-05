import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarClientComponent } from './topbar-client.component';



@NgModule({
  declarations: [TopbarClientComponent],
  imports: [
    CommonModule
  ],
  exports: [TopbarClientComponent]
})
export class TopbarClientModule { }
