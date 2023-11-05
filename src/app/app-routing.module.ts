import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./../app/layouts/main-layout/main-layout.module').then(m => m.MainLayoutModule) },
  { path: 'auth', component: AuthLayoutComponent },
  { path: '', loadChildren: () => import('./../app/layouts/client-layout/client-layout.module').then(m => m.ClientLayoutModule) },

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
