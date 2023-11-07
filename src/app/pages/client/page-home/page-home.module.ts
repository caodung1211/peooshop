import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHomeComponent } from './page-home.component';
import { RouterModule } from '@angular/router';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { CarouselModule, TooltipModule } from 'primeng';
import { SharedPipeModule } from 'src/app/shared/sharedPipe.module';
import { ListProductClientModule } from 'src/app/components/client/list-product-client/list-product-client.module';


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

    CarouselModule,
    ListProductClientModule
  ],
  exports: [PageHomeComponent]
})
export class PageHomeModule { }
