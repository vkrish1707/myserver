import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { BaseLoginProvider } from './base/provider.base';
import { FacebookService } from './facebook/facebook.service';
import { LoginDirective } from './base/login.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoginComponent,
    GoogleComponent,
    FacebookComponent,
    LoginDirective
  ],

  entryComponents: [
    GoogleComponent,
    FacebookComponent
  ],

  providers:[
    FacebookService
  ],

  exports:[
    LoginComponent,
    GoogleComponent,
    FacebookComponent
  ],

})
export class LoginModule { }
