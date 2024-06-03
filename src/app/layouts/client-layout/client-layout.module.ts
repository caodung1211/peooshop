import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client-layout.component';
import { ToastModule } from 'primeng';
import { RouterModule, Routes } from '@angular/router';
import { HeaderMainModule } from 'src/app/components/client/header-main/header-main.module';
import { TopbarClientModule } from 'src/app/components/client/topbar-client/topbar-client.module';
import { FooterClientModule } from 'src/app/components/client/footer-client/footer-client.module';
import { PageLoginModule } from 'src/app/pages/client/page-login/page-login.module';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { 
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./../../pages/client/page-home/page-home.module').then(m => m.PageHomeModule) },
      // { path: 'gioi-thieu', loadChildren: () => import('./../../pages/client/page-about/page-about.module').then(m => m.PageAboutModule) },
      // { path: 'charles-keith', loadChildren: () => import('./../../pages/client/page-products/page-products.module').then(m => m.PageProductsModule) },
      // { path: 'local-brand', loadChildren: () => import('./../../pages/client/page-local-brand/page-local-brand.module').then(m => m.PageLocalBrandModule) },
      // { path: 'bo-suu-tap', loadChildren: () => import('./../../pages/client/page-collection/page-collection.module').then(m => m.PageCollectionModule) },
      { path: 'lien-he', loadChildren: () => import('./../../pages/client/page-contact/page-contact.module').then(m => m.PageContactModule) },
      // { path: 'ctv', loadChildren: () => import('./../../pages/client/page-collab/page-collab.module').then(m => m.PageCollabModule) },
      // { path: 'tim-kiem', loadChildren: () => import('./../../pages/client/page-search-results/page-search-results.module').then(m => m.PageSearchResultsModule) },
      // { path: 'san-pham', loadChildren: () => import('./../../pages/client/page-product-detail/page-product-detail.module').then(m => m.PageProductDetailModule) },
      
      // { path: 'gio-hang', loadChildren: () => import('./../../pages/client/page-cart/page-cart.module').then(m => m.PageCartModule) },
      // { path: 'yeu-thich', loadChildren: () => import('./../../pages/client/page-like/page-like.module').then(m => m.PageLikeModule) },
      // { path: 'thanh-toan', loadChildren: () => import('./../../pages/client/page-checkout/page-checkout.module').then(m => m.PageCheckoutModule) },

      

      { path: '**', loadChildren: () => import('./../../pages/client/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },
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
    HeaderMainModule,
    FooterClientModule,
    PageLoginModule,
    MatDialogModule
    
  ],
  exports: [ClientLayoutComponent]
})
export class ClientLayoutModule { }
