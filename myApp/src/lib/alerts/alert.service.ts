import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Alert } from './alert';

@Injectable()
export class AlertService {

  public maxAlerts: number = 3;
  private allAlerts: Alert[] = new Array<Alert>();
  private filteredAlerts: Alert[] = new Array<Alert>();

  private filteredAlertsSubject = new BehaviorSubject<any>([]);
  private allAlertsSubject = new BehaviorSubject<any>([]);

  public alerts = this.allAlertsSubject.asObservable();
  public activeAlerts = this.filteredAlertsSubject.asObservable();
  
  constructor() {
    this.alerts.subscribe(data => this.allAlerts = data);
    this.activeAlerts.subscribe(data => this.filteredAlerts = data);
    this.refresh();
  }
  
  public addNew(id: number, message: string, icon: string) {
    let alert: Alert = new Alert();
    alert.id = id;
    alert.message = message;
    alert.icon = icon;
    this.allAlerts.push(alert);
    this.allAlertsSubject.next(this.allAlerts);
    this.refresh();
  }

  public refresh(): void {
    if (this.filteredAlerts.length > 0) {
      this.filteredAlerts.splice(0, this.filteredAlerts.length);
    }

    for (let alert of this.allAlerts) {
      if (alert.isActive == true) {
        if (this.filteredAlerts.length == this.maxAlerts) {
          let more: Alert = new Alert();
          more.id = 0;
          more.message = 'more ...';
          this.filteredAlerts.splice(this.maxAlerts - 1, 1);
          this.filteredAlerts.push(more);
        }
        else {
          this.filteredAlerts.push(alert);
        }
      }
    }

    this.filteredAlertsSubject.next(this.filteredAlerts);
  }
}
