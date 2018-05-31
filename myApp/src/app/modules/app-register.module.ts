import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppHeaderModule } from './app-header.module';
import { LoginModule } from '../../lib/login/login.module';
import { AppHomeModule } from './app-home.module';
import { MaterialModule } from '../modules/material.module';

import { RegisterComponent } from '../components/register/register.component';
import { ProgressComponent } from '../../lib/progress/progress.component';
import { EulaComponent } from '../components/eula/eula.component';
import { RegisteruserconfirmComponent } from '../components/registeruserconfirm/registeruserconfirm.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AppHeaderModule,
    AppHomeModule,
    LoginModule,
    MaterialModule,
  ],

  entryComponents: [

  ],

  declarations: [
    RegisterComponent,
    ProgressComponent,
    SignInComponent,
    RegisteruserconfirmComponent,
    EulaComponent
  ]

})

export class AppRegisterModule { }
