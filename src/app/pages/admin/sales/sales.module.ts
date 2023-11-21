import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ErrorsMessageModule } from 'src/app/components/admin/errors-message/errors-message.module';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { EventSourceService } from 'src/app/service/admin/event-source.service';
import { DropdownModule } from 'primeng';



@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SalesComponent
      }
    ]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    ErrorsMessageModule,
    SharedPipeModule,
    DropdownModule
  ],
  providers: [EventSourceService],
  exports: [SalesComponent]
})
export class SalesModule { }
