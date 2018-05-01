import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import globals = require('./app.globals');
import { AppComponent } from './app.component';
import { AlertsModule } from '../lib/alerts/alerts.module';
import { AlertsComponent } from '../lib/alerts/alerts.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AlertsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private injector: Injector) {
    globals.InjectorInstance = injector;
  }
}

