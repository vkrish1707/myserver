import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

import { ILogin } from '../login';

declare const IN: any;

@Injectable()
export class LinkedinService implements ILogin {

  public firstName: string;
  public lastName: string;
  public photoUrl: string;
  public email: string;
  public token: string;
  public providerName: string = 'linkedin';

  constructor() { }

  public onLinkedInLoad() {
    IN.Event.on(IN, "auth", this.launch);
  }

  public launch(): Promise<ILogin> {
    return new Promise((resolve, reject) => {
      let that = this;
      IN.User.authorize(function () {
        IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res: any) {
          that.email = res.emailAddress;
          that.photoUrl = res.pictureUrl;
          that.firstName = res.firstName;
          that.lastName = res.lastName;
          that.token = IN.ENV.auth.oauth_token;
          resolve(that);
        });
      });
    });
  }

  public logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      IN.User.logout(function () {
        resolve();
      }, {});
    });
  }
}
