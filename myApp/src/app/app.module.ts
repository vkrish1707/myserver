import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Globals } from './app.globals';
import { AppComponent } from './app.component';
import { AlertsModule } from '../lib/alerts/alerts.module';
import { AppHeaderModule } from './modules/app-header.module';
import { AppHomeModule } from './modules/app-home.module';
import { AppRegisterModule } from './modules/app-register.module';
import { LoginModule } from '../lib/login/login.module';
import { UserSessionService } from './services/usersession.service';
import { AppRegisterService } from './services/app-register.service';
import { InterceptorService } from './services/interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './modules/material.module';
import { DialogboxModule } from '../lib/dialogbox/dialogbox.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AlertsModule,
    DialogboxModule,
    AppHeaderModule,
    AppHomeModule,
    LoginModule,
    AppRegisterModule,
    MaterialModule,
    NgbModule.forRoot()
  ],

  providers: [
    UserSessionService,
    InterceptorService,
    AppRegisterService,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: UserSessionService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private injector: Injector, private InjectorInstance: Injector) {
    InjectorInstance = injector;
  }
}
