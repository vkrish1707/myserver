import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import globals = require('./app.globals');
import { AppComponent } from './app.component';
import { AlertsModule } from '../lib/alerts/alerts.module';
import { AppHeaderModule } from './modules/app-header.module';
import { AppHomeModule } from './modules/app-home.module';
import { AppRegisterModule } from './modules/app-register.module';
import { UserSessionService } from './services/user-session.service';
import { LoginModule } from '../lib/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertsModule,
    AppHeaderModule,
    AppHomeModule,
    LoginModule,
    AppRegisterModule,
    NgbModule.forRoot() 
  ],
  providers: [UserSessionService],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private injector: Injector) {
    globals.InjectorInstance = injector;
  }
}
