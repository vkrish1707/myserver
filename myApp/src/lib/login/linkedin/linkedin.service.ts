import { Injectable } from '@angular/core';
import { ILogin } from '../login';
import { ISessionInfo } from '../../../app/services/usersession.service';

declare const IN: any;

@Injectable()
export class LinkedinService {

  public email: string;
  public firstName: string;
  public lastName: string;
  public photoUrl: string;
  public token: string;

  constructor() { }

  onLinkedInLoad() {
    IN.Event.on(IN, "auth", this.launch);
  }

  launch(): Promise<ILogin> {
    return new Promise<ILogin>(this.run);
  }

  public run(resolve, reject) {
    IN.User.authorize(function () {
      IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res: any) {
        let info = <ISessionInfo>{};
        info.email = res.emailAddress;
        info.photoUrl = res.pictureUrl;
        info.firstName = res.firstName;
        info.lastName = res.lastName;
        info.token = IN.ENV.auth.oauth_token;
        resolve(info);
      });
    });
  }

  linkedinLogoff(): Promise<any> {
    return new Promise((resolve, reject) => {
      IN.User.logout(function () {
        resolve();
      }, {});
    });
  }
}
