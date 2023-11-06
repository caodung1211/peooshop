import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './page-home.component';
import { RouterModule } from '@angular/router';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { CarouselModule } from 'primeng';


@NgModule({
  declarations: [
    PageHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageHomeComponent
      }
    ]),

    CarouselModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
