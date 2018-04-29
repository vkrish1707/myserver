import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AlertService } from '../lib/alerts/alert.service';
import { AlertCollection } from '../models/alert.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('alerts', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])
  ]
})

export class AppComponent {
  title = 'app';
  message: string;
  index: number = 10;

  private alerts: AlertCollection = new AlertCollection();

  constructor(private alertService: AlertService) {
    this.alerts.newAlert.subscribe(item => this.alertService.addNew(item.id, item.message, item.icon));
    this.alerts.load();
  }

  private addNewAlert() {
    this.alerts.add(this.index++, this.message, 'info');
    this.message = '';
  }
}
