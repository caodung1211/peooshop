import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarCatgoryComponent } from './sidebar-catgory.component';
import { CheckboxModule, SliderModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';



@NgModule({
  declarations: [SidebarCatgoryComponent],
  imports: [
    CommonModule,CheckboxModule,FormsModule,SliderModule,SharedPipeModule
  ],exports: [SidebarCatgoryComponent]
})
export class SidebarCatgoryModule { }
