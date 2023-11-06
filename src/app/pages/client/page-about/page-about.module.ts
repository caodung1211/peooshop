import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAboutComponent } from './page-about.component';
import { RouterModule } from '@angular/router';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';



@NgModule({
  declarations: [
    PageAboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        component: PageAboutComponent,
        path: ''
      }
    ]),
    TopbarClientModule,
    HeaderMainModule
  ],
  exports: [PageAboutComponent]
})
export class PageAboutModule { }
