import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children:[
          {
            path: 'create',
            loadChildren: () => import('./../sales/sales.module').then(m => m.SalesModule)
          },
          {
            path: 'list',
            loadChildren: () => import('./orders-list/orders-list.module').then(m => m.OrdersListModule)
          },
          {
            path: 'list/:id',
            loadChildren: () => import('./orders-list/edit-order/edit-order.module').then(m => m.EditOrderModule)
          },
          { path: '', redirectTo: 'list', pathMatch: 'full' },
        ]
      },
      
    ]),
  ], 
  exports: []
})
export class OrdersModule { }
