import { EventEmitter } from '@angular/core';

export abstract class BaseLoginProvider {

    private eventCancel = new EventEmitter<BaseLoginProvider>();
    private eventSuccess = new EventEmitter<BaseLoginProvider>();

    constructor() {}

    private _token: any;

    abstract get Name(): string;
    abstract get EMail(): string;
    abstract get PhotoUrl() : string;

    public get Token() {
        return this._token;
    }

    oncancel = this.eventCancel.asObservable();
    onsuccess = this.eventSuccess.asObservable();

    protected abstract logoff(): void;

    protected success(token: any) {
        this._token = token;
        console.log('in base provider - success');
        console.log(this.eventSuccess);
        this.eventSuccess.emit(this);
    }

    protected cancelled() {
        this.eventCancel.emit(this);
    }
}
