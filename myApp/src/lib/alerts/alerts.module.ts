import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertsComponent } from './alerts.component';
import { AlertService } from './alert.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AlertsComponent],
  providers: [AlertService],
  exports: [AlertsComponent]

})

export class AlertsModule { }
