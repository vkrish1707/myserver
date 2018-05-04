import { Component,
         Input, Output,
         AfterViewInit, ViewChild,
         ComponentFactoryResolver, EventEmitter, OnDestroy } from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { GoogleComponent } from './google/google.component';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  @Input() google = 'yes';
  @Output() oncancel: EventEmitter<void>;
  @Output() oncomplete: EventEmitter<BaseLoginProvider> = new EventEmitter();
  @ViewChild(LoginDirective) host: LoginDirective; 

  title = 'social network login';

  private selectedProvider: BaseLoginProvider = null;
  private providers: BaseLoginProvider[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponents();
  }

  ngOnDestroy() {
  }

  public get provider(): string {
    return ((this.selectedProvider != null) ? this.selectedProvider.Name : null); 
  }

  public get token(): string {
    return ((this.selectedProvider != null) ? this.selectedProvider.Token : null);
  }

  private loadComponents() {
    const components: any[] = [];

    if (this.google === 'yes') {
      components.push(GoogleComponent);
    }

    this.providers = [];
    this.selectedProvider = null;
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
    // console.log('LoginComponent: Operation Completed. Provider = ' + provider.Name);
    // console.log('token = ' + provider.Token);
    this.selectedProvider = provider;
    console.log(this.oncomplete);
    if (this.oncomplete == null) {
      console.log('Trigerring oncomplete event');
      this.oncomplete.emit(null);
    }
    else {
      console.error('oncomplete event is undefined');
    }
  }

  private cancelled(provider: BaseLoginProvider) {
    console.log('LoginComponent: Operation Cancelled. Provider = ' + provider.Name);
    if (this.oncancel == null) {
      console.log('Trigering oncancel event');
      this.oncancel.emit();
    }
    else {
      console.error('oncancel event is undefined');
    }
  }
}
