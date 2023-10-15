import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin', loadChildren: () => import('./../../pages/admin/admin.module').then(m => m.AdminModule) },
    ] 
  },
];

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainLayoutModule { }
