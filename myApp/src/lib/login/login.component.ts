import { Component,
         Input, Output,
         AfterViewInit, ViewChild,
         ComponentFactoryResolver, EventEmitter, OnDestroy } from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { GoogleComponent } from './google/google.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  @Input() google = 'yes';
  @Output() oncancel = new EventEmitter();
  @Output() oncomplete = new EventEmitter();
  @ViewChild(LoginDirective) host: LoginDirective; 

  title = 'social network login';

  private providers: BaseLoginProvider[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponents();
  }

  ngOnDestroy() {
  }

  private loadComponents() {
    const components: any[] = [];

    if (this.google === 'yes') {
      components.push(GoogleComponent);
    }

    this.providers = [];
    this.host.viewContainerRef.clear();
    for (const cmp of components) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(cmp);
      const item = this.host.viewContainerRef.createComponent(factory);
      (<BaseLoginProvider>item.instance).onsuccess.subscribe(this.completed);
      (<BaseLoginProvider>item.instance).oncancel.subscribe(this.cancelled);
      this.providers.push((<BaseLoginProvider>item.instance));
    }
  }

  private completed(provider: BaseLoginProvider) {
    console.log('LoginComponent: Operation Completed. Provider = ' + provider.Name);
    console.log('token = ' + provider.Token);
    // this.oncomplete.emit();
  }

  private cancelled(provider: BaseLoginProvider) {
    console.log('LoginComponent: Operation Cancelled. Provider = ' + provider.Name);
    // this.oncancel.emit();
  }
}
