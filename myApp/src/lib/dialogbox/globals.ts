import { Injector } from "@angular/core";

export let InjectorInstance: Injector;

export enum DialogBoxResult {
    Yes,
    No,
    Ok,
    Cancel,
    Close
}