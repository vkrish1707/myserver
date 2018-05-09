import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { BaseLoginProvider } from './base/provider.base';
import { FacebookService } from './facebook/facebook.service';
import { LoginDirective } from './base/login.directive';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { MicrosoftService } from './microsoft/microsoft.service';

@NgModule({
  imports: [
    CommonModule
  ],
  
  declarations: [
    LoginComponent,
    GoogleComponent,
    FacebookComponent,
    MicrosoftComponent,
    LoginDirective
  ],

  entryComponents: [
    GoogleComponent,
    FacebookComponent,
    MicrosoftComponent
  ],

  providers:[
    FacebookService,
    MicrosoftService
  ],

  exports:[
    LoginComponent
  ],

})

export class LoginModule { }
