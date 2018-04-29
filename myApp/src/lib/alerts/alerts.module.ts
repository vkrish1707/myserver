import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AlertsComponent } from './alerts.component';
import { AlertService } from './alert.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AlertService],
  declarations: [AlertsComponent],
  exports: [AlertsComponent]
})

export class AlertsModule { }
