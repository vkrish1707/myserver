import { Component, OnInit } from '@angular/core';
import { Alert } from './alert';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

import { AlertService } from './alert.service';

@Component({
  selector: 'lib-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css'],
  animations: [
    trigger('alerts', [
      transition('*=>*', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1.0, transform: 'translateY(0)', offset: 1.0 })
          ]))
        ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 })
          ]))
        ]), { optional: true })
      ])
    ])
  ]
})

export class AlertsComponent implements OnInit {

  public alerts: Alert[];
  public status: string;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.activeAlerts
      .subscribe(data => this.alerts = data);
  }
  dismissAlert(alert) {
    alert.dismiss();
    this.alertService.refresh();
  }
}
