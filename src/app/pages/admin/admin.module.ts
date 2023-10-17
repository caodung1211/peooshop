import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { TopbarComponent } from 'src/app/components/admin/topbar/topbar.component';
import { SidebarComponent } from 'src/app/components/admin/sidebar/sidebar.component';
import { BreadcrumbModule } from 'src/app/components/admin/breadcrumb/breadcrumb.module';

const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    data: {
      breadcrumb: "Admin"
    },
    children:[
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'products', loadChildren: () => import('./products/products/products.module').then(m => m.ProductsModule) },
      { path: 'categories', loadChildren: () => import('./products/categories/categories.module').then(m => m.CategoriesModule), },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', loadChildren: () => import('../page404/page404.module').then(m => m.Page404Module) }
    ]
  },
]

@NgModule({
  declarations: [
    AdminComponent,
    TopbarComponent,
    SidebarComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
