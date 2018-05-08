import { Component,
         Input, Output,
         AfterViewInit, ViewChild,
         ComponentFactoryResolver, EventEmitter, OnDestroy } from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit, OnDestroy {

  @Input() google = 'yes';
  @Input() facebook = 'yes';
  @Output() oncancel: EventEmitter<any> = new EventEmitter();
  @Output() oncomplete: EventEmitter<any> = new EventEmitter();
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
    let that = this;
    const components: any[] = [];

    if (this.google === 'yes') {
      components.push(GoogleComponent);
    }

    if (this.facebook === 'yes') {
      components.push(FacebookComponent);
    }

    let completed = (provider) => {
      that.selectedProvider = provider;
      that.oncomplete.emit(null)
    };

    let cancelled = (provider) => {
      console.log('trigerring cancelled event');
      console.log('LoginComponent: Operation cancelled. Provider = ' + provider.Name);
      that.oncancel.emit(null)
    };

    this.providers = [];
    this.selectedProvider = null;
    this.host.viewContainerRef.clear();
    for (const cmp of components) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(cmp);
      const item = this.host.viewContainerRef.createComponent(factory);
      (<BaseLoginProvider>item.instance).onsuccess.subscribe(completed);
      (<BaseLoginProvider>item.instance).oncancel.subscribe(cancelled);
      this.providers.push((<BaseLoginProvider>item.instance));
    }
  }
}
