import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng';
import { BoxCardModule } from 'src/app/components/admin/box-card/box-card.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
    ]),
    BoxCardModule,
    ChartModule
  ]
})
export class DashboardModule { }
