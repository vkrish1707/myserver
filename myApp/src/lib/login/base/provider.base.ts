import { EventEmitter } from '@angular/core';

import { ILogin } from '../login';
import { LoginService } from '../login.service';

export abstract class BaseLoginProvider {
    
    private eventCancel = new EventEmitter();
    private eventSuccess = new EventEmitter<ILogin>();
    private eventClick = new EventEmitter();

    constructor(protected loginService: LoginService) {
        this.loginService.freeze.subscribe(data => {
            this.freeze(data);
            // console.log(data);
        })
    }

    oncancel = this.eventCancel.asObservable();
    onsuccess = this.eventSuccess.asObservable();
    onclick = this.eventClick.asObservable();

    protected success(data: ILogin) {
        this.eventSuccess.emit(data);
    }

    protected cancelled() {
        console.log(this.eventCancel);
        this.eventCancel.emit();
    }

    protected click() {
        console.log('click from base');
        this.eventClick.emit();
    }

    protected abstract freeze(value: boolean);
}
