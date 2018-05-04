import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appLogin]',
})

export class LoginDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
