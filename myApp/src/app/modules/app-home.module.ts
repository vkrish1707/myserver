import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderModule } from './app-header.module';
import { HomeComponent } from '../components/home/home.component';
import { HomewithsessionComponent } from '../components/homewithsession/homewithsession.component';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule
  ],
  declarations: [
    HomeComponent,
    HomewithsessionComponent,
  ]
})

export class AppHomeModule { }
