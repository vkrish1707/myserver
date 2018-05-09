import { EventEmitter } from '@angular/core';

export abstract class BaseLoginProvider {

    private eventCancel = new EventEmitter<BaseLoginProvider>();
    private eventSuccess = new EventEmitter<BaseLoginProvider>();

    constructor() {}

    private _token: any;

    abstract get providerName(): string;
    abstract get userName(): string;
    abstract get email(): string;
    abstract get photoUrl() : string;

    public get Token(): string {
        return this._token;
    }

    oncancel = this.eventCancel.asObservable();
    onsuccess = this.eventSuccess.asObservable();

    protected abstract logoff(): void;

    protected success(token: any) {
        this._token = token;
        this.eventSuccess.emit(this);
    }

    protected cancelled() {
        this.eventCancel.emit(this);
    }
}
