import { showError } from '../lib/utilities/globalfunctions';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { InjectorInstance } from '../app/app.module';

export class AlertCollection {
    private alerts: Alert[] = new Array<Alert>();
    private newAlertSubject = new Subject<Alert>();

    public newAlert = this.newAlertSubject.asObservable();

    constructor () {}

    add(id: number, message: string, icon: string) {
        if(this.find(id) == -1) {
            let alert = new Alert();
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
        }
        else {
            showError('alert with id = '+ id + ' not found ');
        }
    }

    private find(id: number): number {
        return this.alerts.findIndex(item => item.id == id);
    }

    load() {
        let url = 'http://localhost:3000/api/alerts';
        let http = InjectorInstance.get<HttpClient>(HttpClient);
        http.get<any>(url).subscribe(res => {this.newAlert = res});
    }
}

export class Alert {
    id: number;
    message: string;
    icon: string;
}