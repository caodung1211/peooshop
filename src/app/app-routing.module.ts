import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./../app/layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule) },
  { path: 'admin-login', loadChildren: () => import('../app/pages/admin/login/admin-login/admin-login.module').then(m => m.AdminLoginModule) },
  { path: 'auth', component: AuthLayoutComponent },
  { path: 'gioi-thieu', loadChildren: () => import('./pages/client/page-about/page-about.module').then(m => m.PageAboutModule) },
  { path: '', loadChildren: () => import('./../app/layouts/client-layout/client-layout.module').then(m => m.ClientLayoutModule) },
  // { path: '', loadChildren: () => import('./../app/layouts/client-layout/client-layout.module').then(m => m.ClientLayoutModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
