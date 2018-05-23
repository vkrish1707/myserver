import { Component,
         Input, Output,
         AfterViewInit, ViewChild,
         ComponentFactoryResolver, EventEmitter, OnDestroy } from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { ILogin } from './login';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { LinkedinComponent } from './linkedin/linkedin.component';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements AfterViewInit, OnDestroy {

  @Input() google = 'yes';
  @Input() facebook = 'yes';
  @Input() microsoft = 'yes';
  @Input() linkedin = 'yes';

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

    if (this.microsoft === 'yes') {
      components.push(MicrosoftComponent);
    }

    if (this.linkedin === 'yes') {
      components.push(LinkedinComponent);
    }

    let completed = (provider) => {
      that.oncomplete.emit(<ILogin> provider);
    };

    let cancelled = (provider: ILogin) => {
      that.oncancel.emit(null);
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
