import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from './app-header.module';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../../lib/login/login.component';
import { LoginDirective } from '../../lib/login/base/login.directive';
import { GoogleComponent } from '../../lib/login/google/google.component';
import { ProgressComponent } from '../../lib/progress/progress.component';
import { FacebookComponent } from '../../lib/login/facebook/facebook.component';
import { FacebookService } from '../../lib/login/facebook/facebook.service';
import { LoginModule } from '../../lib/login/login.module';
import { AppHomeModule } from './app-home.module';
import { EulaComponent } from '../components/eula/eula.component';
import { RegisteruserconfirmComponent } from '../components/registeruserconfirm/registeruserconfirm.component';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    LoginModule,
    HttpModule,
  ],
  
  declarations: [
    RegisterComponent,
    ProgressComponent,
    RegisteruserconfirmComponent,
    EulaComponent
  ]
})
export class AppRegisterModule { }
