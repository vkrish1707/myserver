import { Injector } from "@angular/core";

export class Core {
    public InjectorInstance: Injector
}

export enum DialogBoxResult {
    Yes,
    No,
    Ok,
    Cancel,
    Close
}
