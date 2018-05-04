import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from './app-header.module';
import { HttpModule } from '@angular/http';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../../lib/login/login.component';
import { LoginDirective } from '../../lib/login/base/login.directive';
import { GoogleComponent } from '../../lib/login/google/google.component';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    HttpModule
  ],
  
  entryComponents: [
    GoogleComponent
  ]
  ,

  declarations: [
    RegisterComponent,
    LoginComponent,
    LoginDirective,
    GoogleComponent
  ]
})
export class AppRegisterModule { }
