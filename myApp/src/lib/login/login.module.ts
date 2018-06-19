import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../app/app-routing.module';
import { LoginComponent } from './login.component';
import { LoginDirective } from './base/login.directive';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { MaterialModule } from '../../app/modules/material.module';
import { ProgressComponent } from '../progress/progress.component';
import { LoginService } from './login.service';
import { LoadingComponent } from '../loading/loading.component';
import { LinkedinService } from './linkedin/linkedin.service';

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
    LoadingComponent
  ],

  declarations: [
    LoginComponent,
    LoginDirective,
    GoogleComponent,
    FacebookComponent,
    ProgressComponent,
    MicrosoftComponent,
    LinkedinComponent,
    LoadingComponent
  ],
  providers: [
    LoginService,
    LinkedinService
  ],

  exports: [
    LoginComponent,
    ProgressComponent,
  ]
})

export class LoginModule { }
