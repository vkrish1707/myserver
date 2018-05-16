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
    this.token = null;

    return new Promise<ILogin>(this.run);
  }

  private run(resolve, reject) {
    // attempt logging into facebook
    FB.login(
        response => { 
          this.token = ((response.authResponse != null) ? response.authResponse.accessToken : null); 
        },
        {
          scope: 'public_profile, email', return_scopes: true
        }
    );

    // if the login is successful,
    if (this.token != null) {
      let that = this;
      FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function (result) {
        that.firstName = result.first_name;
        that.lastName = result.last_name;
        that.email = result.email;
        that.photoUrl = result.picture.data.url;
      });

      // all set -- resolve the promise
      resolve(<ILogin> this);
    } else {

      // inform operation failure by invoking the reject
      reject();
    }
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
