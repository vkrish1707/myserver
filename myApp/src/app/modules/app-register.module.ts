import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppHeaderModule } from './app-header.module';
import { LoginModule } from '../../lib/login/login.module';
import { AppHomeModule } from './app-home.module';

import { RegisterComponent } from '../components/register/register.component';
import { ProgressComponent } from '../../lib/progress/progress.component';
import { EulaComponent } from '../components/eula/eula.component';
import { RegisteruserconfirmComponent } from '../components/registeruserconfirm/registeruserconfirm.component';
import { AppRegisterService } from '../services/app-register.service';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    AppHomeModule,
    LoginModule,
    HttpModule,
  ],

  declarations: [
    RegisterComponent,
    ProgressComponent,
    RegisteruserconfirmComponent,
    EulaComponent
  ],
  
  providers: [AppRegisterService]
})

export class AppRegisterModule { }
