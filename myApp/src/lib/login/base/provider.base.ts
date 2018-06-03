import { EventEmitter } from '@angular/core';

import { ILogin } from '../login';

export abstract class BaseLoginProvider {
    
    private eventCancel = new EventEmitter();
    private eventSuccess = new EventEmitter<ILogin>();
    private eventState = new EventEmitter();

    constructor() {}

    oncancel = this.eventCancel.asObservable();
    onsuccess = this.eventSuccess.asObservable();
    onclick = this.eventState.asObservable();

    protected success(data: ILogin) {
        this.eventSuccess.emit(data);
    }

    protected cancelled() {
        this.eventCancel.emit();
    }

    protected state() {
        this.eventState.emit();
    }
}
