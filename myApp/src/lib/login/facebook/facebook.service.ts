import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ILogin } from '../login';
import { resolve } from 'url';

declare const FB: any;

@Injectable()
export class FacebookService implements ILogin {

  // interface members
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public get providerName(): string {
    return 'facebook';
  }

  constructor(private http: Http) {
    FB.init({
      appId: '1820292001598094',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
  }

  public launch(): Promise<ILogin> {
    return new Promise<ILogin>(this.run);
  }

  private run(resolve, reject) {
    FB.login(
      response => {
        let that = this;
        if (response.authResponse) {
          that.token = response.authResponse.accessToken;
          FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function (result) {
            that.firstName = result.first_name;
            that.lastName = result.last_name;
            that.email = result.email;
            that.photoUrl = result.picture.data.url;
            resolve(that);
          });

        } else {

          // authetication is failed or cancelled
          // let caller handle it via reject
          reject();
        }
      },
      {
        scope: 'public_profile, email', return_scopes: true
      }
    );
  }

  public logout(): Promise<void> {
    console.log('fbLogout from facebook-service is called');

    return new Promise<void>((resolve, reject) => {
      FB.getLoginStatus(function (response) {
        if (response && response.status === 'connected') {
          FB.logout(function (response) {
            window.location.reload();
          });
          resolve();
        }
        else {
          reject();
        }
      });
    });
  }
}
