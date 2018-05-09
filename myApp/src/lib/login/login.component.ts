import { Component,
         Input, Output,
         AfterViewInit, ViewChild,
         ComponentFactoryResolver, EventEmitter, OnDestroy } from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { ILoginInfo } from './login';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit, OnDestroy {

  @Input() google = 'yes';
  @Input() facebook = 'yes';
  @Output() oncancel: EventEmitter<any> = new EventEmitter();
  @Output() oncomplete: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(LoginDirective) host: LoginDirective; 

  private providers: BaseLoginProvider[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponents();
  }

  ngOnDestroy() {
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
      let info = <ILoginInfo>{};
      info.providerName = provider.Name;
      info.email = provider.email;
      info.firstName = provider.firstName;
      info.lastName = provider.lastName;
      info.photoUrl = provider.photoUrl;
      info.token = provider.token;
      that.oncomplete.emit(<ILoginInfo> provider);
    };

    let cancelled = (provider) => {
      console.log('trigerring cancelled event');
      console.log('LoginComponent: Operation cancelled. Provider = ' + provider.Name);
      that.oncancel.emit(null)
    };

    this.providers = [];
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
