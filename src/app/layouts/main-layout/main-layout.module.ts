import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { DataBroadcastService } from 'src/app/service/data-broadcast.service';
import { MessageService, ToastModule } from 'primeng';

const routes: Routes = [
  { 
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./../../pages/admin/admin.module').then(m => m.AdminModule) },
    ],
    
  },
];

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),ToastModule
  ],
  providers: [DataBroadcastService,MessageService],
  exports: [MainLayoutComponent]
})
export class MainLayoutModule { }
