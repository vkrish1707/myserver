import { Component, OnInit, AfterViewInit } from '@angular/core';

import { BaseLoginProvider } from '../base/provider.base';
import * as Msal from 'msal';
import { MicrosoftService } from './microsoft.service';

@Component({
  selector: 'lib-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.css']
})

export class MicrosoftComponent extends BaseLoginProvider implements OnInit {

  providerName = 'microsoft';
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  token: any;

  private access_token: any = null;
  private app: any;

  private config = {
    clientId: "be8c0de3-39bb-4c97-91ed-b59dcfd0d031",
    redirectUrl: "http://localhost:4200/",
    graphEndpoint: "https://graph.microsoft.com/v1.0/me",
    graphScopes: ["user.read", "mail.send"]
  }

  constructor(private microsoftService: MicrosoftService) {
    super();
  }

  onLogin() {
    this.microsoftService.login()
      .then(mstoken => {
        this.token = mstoken;
        this.firstName = this.microsoftService.firstName;
        this.lastName = this.microsoftService.lastName;
        this.email = this.microsoftService.email;
        this.photoUrl = this.microsoftService.photoUrl;
        this.success();
      })
      .catch(() => this.cancelled());
  }

  ngOnInit() {
  }

  logoff(): void {
    throw new Error('Method not implemented.');
  }
}
