import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './page-home.component';
import { RouterModule } from '@angular/router';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { CarouselModule, TooltipModule } from 'primeng';
import { PriceCustomPipe } from 'src/app/pipes/pricePipe.pipe';


@NgModule({
  declarations: [
    PageHomeComponent,PriceCustomPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PageHomeComponent
      }
    ]),

    CarouselModule,
    TooltipModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
