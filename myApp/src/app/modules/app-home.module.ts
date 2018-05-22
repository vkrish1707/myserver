import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderModule } from './app-header.module';
import { HomeComponent } from '../components/home/home.component';
import { HomewithsessionComponent } from '../components/homewithsession/homewithsession.component';
import { TryMeComponent } from '../components/tryme/tryme.component';
<<<<<<< HEAD
import { HTTP_INTERCEPTORS } from '@angular/common/http';
=======
>>>>>>> fc37d39866fa6606092d269db0ce7115c7ef946c
import { UserSessionService } from '../services/usersession.service';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule
  ],
  
  declarations: [
    HomeComponent,
    HomewithsessionComponent,
    TryMeComponent
  ],

  exports: [
    HomeComponent,
    HomewithsessionComponent,
    TryMeComponent
<<<<<<< HEAD
  ],

  providers: [ ]
=======
  ]
>>>>>>> fc37d39866fa6606092d269db0ce7115c7ef946c

})

export class AppHomeModule { }
