import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app/app-routing.module';
import { LoginComponent } from './login.component';
import { LoginDirective } from './base/login.directive';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { FacebookService } from './facebook/facebook.service';
import { MicrosoftService } from './microsoft/microsoft.service';
import { LoginService } from './login.service';
import { GoogleService } from './google/google.service';
import { LinkedinService } from './linkedin/linkedin.service';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  entryComponents: [
    GoogleComponent,
    FacebookComponent,
    MicrosoftComponent,
    LinkedinComponent
  ],
  declarations: [
    LoginComponent,
    LoginDirective,
    GoogleComponent,
    FacebookComponent,
    MicrosoftComponent,
    LinkedinComponent
  ],
  providers: [FacebookService, MicrosoftService, LoginService, GoogleService, LinkedinService],
  exports: [LoginComponent]
})

export class LoginModule { }
