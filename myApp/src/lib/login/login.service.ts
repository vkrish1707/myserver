import { Injectable } from '@angular/core';
import { FacebookService } from './facebook/facebook.service';
import { ILoginInfo } from './login';
import { GoogleService } from './google/google.service';
import { MicrosoftService } from './microsoft/microsoft.service';
import { LinkedinService } from './linkedin/linkedin.service';

declare const FB: any;


@Injectable()
export class LoginService {

  constructor(private facebookService: FacebookService, private googleService: GoogleService, private microsoftService: MicrosoftService, private linkedinService: LinkedinService) { }

  logoff(): Promise<ILoginInfo> {
    return new Promise<ILoginInfo>((resolve, reject) => {
      this.facebookService.fbLogout();
      this.linkedinService.linkedinLogoff();
      this.googleService.signOut();
      // this.microsoftService.logout();
      console.log('logoff from facebook implemented');
      resolve();
    })
  }

  logout(): Promise<ILoginInfo> {
    return new Promise<ILoginInfo>((resolve,reject) => {
      this.microsoftService.logout();
    })
  }

}
