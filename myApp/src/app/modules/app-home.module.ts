import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppHeaderModule } from './app-header.module';
import { HomeComponent } from '../components/home/home.component';
import { HomewithsessionComponent } from '../components/homewithsession/homewithsession.component';
import { TryMeComponent } from '../components/tryme/tryme.component';
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
  ]

})

export class AppHomeModule { }
