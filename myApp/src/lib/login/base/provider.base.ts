import { EventEmitter } from '@angular/core';

import { ILoginInfo } from '../login';

export abstract class BaseLoginProvider implements ILoginInfo {
    
    private eventCancel = new EventEmitter<BaseLoginProvider>();
    private eventSuccess = new EventEmitter<BaseLoginProvider>();

    constructor() {}

    abstract get providerName(): string;
    abstract get firstName(): string;
    abstract get lastName(): string;
    abstract get email(): string;
    abstract get photoUrl(): string;
    abstract get token(): any;

    oncancel = this.eventCancel.asObservable();
    onsuccess = this.eventSuccess.asObservable();

    protected abstract logoff(): void;

    protected success() {
        this.eventSuccess.emit(this);
    }

    protected cancelled() {
        this.eventCancel.emit(this);
    }
}
