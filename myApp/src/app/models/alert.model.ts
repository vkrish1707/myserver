import { showError } from '../../lib/utilities/globalfunctions';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/Observable/of';
import { HttpClient } from '@angular/common/http';
import globals = require('../app.globals');
// import { Injector } from "@angular/core";

export class AlertCollection {
    private localAlertId: number = -100;
    private alerts: IAlert[] = new Array<IAlert>();
    private newAlertSubject = new Subject<IAlert>();

    public newAlert = this.newAlertSubject.asObservable();

    // public InjectorInstance: Injector;

    add(id: number, message: string, icon: string) {
        if (id == -1) {
            id = this.localAlertId--;
        }

        if (this.find(id) == -1) {
            let alert = <IAlert>{};
            alert.id = id;
            alert.message = message;
            alert.icon = icon;
            this.alerts.push(alert);
            this.newAlertSubject.next(alert);
        }
    }

    remove(id: number) {
        let index = this.find(id);
        if (index != -1) {
            this.alerts.splice(index, 1);
        } else {
             showError('alert with id = ' + id + ' not found');
          }
    }

    private find(id: number): number {
        return this.alerts.findIndex(item => item.id == id);
    }

    load() {
        let url = 'http://localhost:3000/api/alerts';
        let http =  globals.InjectorInstance.get<HttpClient>( HttpClient )
        http.get<IAlert[]>(url).subscribe(alerts => {
            for (let alert of alerts) {
                this.add(alert.id, alert.message, alert.icon);
            }
        });
    }
}

export interface IAlert {
    id: number;
    message: string;
    icon: string;
}
