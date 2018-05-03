import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import globals = require('./app.globals');
import { AppComponent } from './app.component';
import { AlertsModule } from '../lib/alerts/alerts.module';
import { AppHeaderModule } from './modules/app-header.module';
import { AppHomeModule } from './modules/app-home.module';
import { AppRegisterModule } from './modules/app-register.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertsModule,
    AppHeaderModule,
    AppHomeModule,
    AppRegisterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private injector: Injector) {
    globals.InjectorInstance = injector;
  }
}

