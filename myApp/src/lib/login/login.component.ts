import {
  Component,
  Input, Output,
  AfterViewInit, ViewChild,
  ComponentFactoryResolver, EventEmitter, OnDestroy, ChangeDetectorRef
} from '@angular/core';

import { LoginDirective } from './base/login.directive';
import { BaseLoginProvider } from './base/provider.base';
import { ILogin } from './login';
import { GoogleComponent } from './google/google.component';
import { FacebookComponent } from './facebook/facebook.component';
import { MicrosoftComponent } from './microsoft/microsoft.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { LoginService } from './login.service';

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

  private state: string = 'login';

  // @Output() oncancel: EventEmitter<any> = new EventEmitter();
  @Output() oncomplete: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(LoginDirective) host: LoginDirective;

  private providers: BaseLoginProvider[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef, private service: LoginService) { }

  ngAfterViewInit() {
    this.loadComponents();
    this.cdr.detectChanges();
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
      that.oncomplete.emit(<ILogin>provider);  
    };

    let cancelled = () => {
      console.log('cancelled from login');
      this.state = null;
      // that.oncancel.emit(null);      
    };

    let clicked = (provider) => {    
      console.log('click from login component');        
      this.state = 'loading';
    };

    this.providers = [];
    this.host.viewContainerRef.clear();
    for (const cmp of components) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(cmp);
      const item = this.host.viewContainerRef.createComponent(factory);
      (<BaseLoginProvider>item.instance).onclick.subscribe(clicked);
      (<BaseLoginProvider>item.instance).oncancel.subscribe(cancelled);
      (<BaseLoginProvider>item.instance).onsuccess.subscribe(completed);
      this.providers.push((<BaseLoginProvider>item.instance));
    }
  }
}
