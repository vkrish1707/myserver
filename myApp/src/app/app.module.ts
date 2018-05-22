import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import globals = require('./app.globals');
import { AppComponent } from './app.component';
import { AlertsModule } from '../lib/alerts/alerts.module';
import { AppHeaderModule } from './modules/app-header.module';
import { AppHomeModule } from './modules/app-home.module';
import { AppRegisterModule } from './modules/app-register.module';
import { LoginModule } from '../lib/login/login.module';
import { UserSessionService } from './services/usersession.service';
import { AppRegisterService } from './services/app-register.service';

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
<<<<<<< HEAD
=======

>>>>>>> fc37d39866fa6606092d269db0ce7115c7ef946c
  providers: [UserSessionService, AppRegisterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserSessionService,
      multi: true
    }
<<<<<<< HEAD

  ],
=======
  ],

>>>>>>> fc37d39866fa6606092d269db0ce7115c7ef946c
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private injector: Injector) {
    globals.InjectorInstance = injector;
  }
}
