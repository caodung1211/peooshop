import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client-layout.component';
import { ToastModule } from 'primeng';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./../../pages/client/page-home/page-home.module').then(m => m.PageHomeModule) },
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
    ToastModule
  ],
  exports: [ClientLayoutComponent]
})
export class ClientLayoutModule { }
