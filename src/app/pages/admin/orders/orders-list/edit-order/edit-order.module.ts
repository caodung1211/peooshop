import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOrderComponent } from './edit-order.component';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { FormsModule } from '@angular/forms';
import { DateCustomPipePipesModule } from 'src/app/pipes/dataPipe.pipe';
import { TimelineModule } from 'src/app/components/admin/timeline/timeline.module';



@NgModule({
  declarations: [EditOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditOrderComponent,
        data: {
          breadcrumb: 'Chi tiết đơn hàng',
        },
      }
    ]),
    SharedPipeModule,
    FormsModule,
    DateCustomPipePipesModule,
    TimelineModule
  ],
  exports: [EditOrderComponent]
})
export class EditOrderModule { }
