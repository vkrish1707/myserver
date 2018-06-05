import { Component, OnInit } from '@angular/core';

import { BaseLoginProvider } from '../base/provider.base';
import { MicrosoftService } from './microsoft.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'lib-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.css']
})

export class MicrosoftComponent extends BaseLoginProvider implements OnInit {

  constructor(private microsoftService: MicrosoftService, private service: LoginService) {
    super(service);
    this.microsoftService.initAuth();
  }

  disabled: boolean;

  ngOnInit() {
  }

  private async onLogin() {
    await this.microsoftService.run();
    this.success(this.microsoftService);
  }

  onClick() {
    // this.service.lock();
  }

  protected freeze(value: boolean) {
    console.log('microsoft==it worked');
    this.disabled = value;
  }

}
