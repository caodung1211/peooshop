import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './layouts/main-layout/main-layout.module';
import { AuthLayoutModule } from './layouts/auth-layout/auth-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableBaseLayoutModule } from './components/admin/table-base-layout/table-base-layout.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { SidebarCatgoryComponent } from './components/client/sidebar-catgory/sidebar-catgory.component';
@NgModule({
  declarations: [AppComponent, SidebarCatgoryComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainLayoutModule,
    AuthLayoutModule,
    BrowserAnimationsModule,
    TableBaseLayoutModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    MatDatepickerModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
