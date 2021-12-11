import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./services/auth/interceptors/auth.interceptor";
import { TokenInterceptor } from "./services/auth/interceptors/token.interceptor";

import { AppComponent } from './app.component';


//first router
import { APP_ROUTES } from './app-routing.module';

//componete para redireccionar
import { RedirectComponent } from './redirect/redirect.component';

//paginas sin loguear
import { LoginComponent } from './login/login.component';

//modulo de paginas
import { PagesModule } from "./pages/pages.module";

//modulo de servicios
import { ServicesModule } from "./services/services.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   // RUTAS
     APP_ROUTES,
    PagesModule,
    ServicesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
