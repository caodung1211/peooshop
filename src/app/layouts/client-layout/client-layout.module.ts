import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client-layout.component';
import { ToastModule } from 'primeng';
import { RouterModule, Routes } from '@angular/router';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';

const routes: Routes = [
  { 
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./../../pages/client/page-home/page-home.module').then(m => m.PageHomeModule) },
      { path: 'gioi-thieu', loadChildren: () => import('./../../pages/client/page-about/page-about.module').then(m => m.PageAboutModule) },
      { path: 'san-pham', loadChildren: () => import('./../../pages/client/page-products/page-products.module').then(m => m.PageProductsModule) },

      
    ],
    
  },
];


@NgModule({
  declarations: [
    ClientLayoutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToastModule,
    TopbarClientModule,
    HeaderMainModule
  ],
  exports: [ClientLayoutComponent]
})
export class ClientLayoutModule { }
