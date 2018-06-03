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
import { GoogleService } from './google/google.service';
import { LinkedinService } from './linkedin/linkedin.service';
import { MaterialModule } from '../../app/modules/material.module';
import { ProgressComponent } from '../progress/progress.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],

  entryComponents: [
    GoogleComponent,
    FacebookComponent,
    MicrosoftComponent,
    ProgressComponent,
    LinkedinComponent,
  ],

  declarations: [
    LoginComponent,
    LoginDirective,
    GoogleComponent,
    FacebookComponent,
    ProgressComponent,
    MicrosoftComponent,
    LinkedinComponent
  ],
  providers: [
    FacebookService,
    MicrosoftService,
    GoogleService,
    LinkedinService
  ],

  exports: [
    LoginComponent,
    GoogleComponent,
    ProgressComponent
  ]
})

export class LoginModule { }
