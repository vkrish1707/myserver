import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ILogin } from '../login';

declare const FB: any;

@Injectable()
export class FacebookService implements ILogin {

  // interface members
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'facebook';

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
    return new Promise<ILogin>((resolve, reject) => {
      let info: ILogin = <ILogin>this;
      this.run().then(
        val => {
          info.email = val.email;
          info.firstName = val.firstName;
          info.lastName = val.lastName;
          info.token = val.token;
          resolve(info);
        })

      reject(null);

    })

    //   .then(
    //     data => {
    //       info.email = data.email;
    //       info.token = data.token;
    //       info.firstName = data.firstName;
    //     })
    //   .catch(reason => console.log(reason));

    // // return
    // return info;
  }

  private run() {
    // attempt logging into facebook
    let info: ILogin = <ILogin>{};
    return new Promise<ILogin>((resolve, reject) => {
      FB.login(
        response => {
          info.token = ((response.authResponse != null) ? response.authResponse.accessToken : null);
        },
        {
          scope: 'public_profile, email', return_scopes: true
        }
      );

      // if the login is successful,
      if (info.token != null) {
        FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function (result) {
          info.firstName = result.first_name;
          info.lastName = result.last_name;
          info.email = result.email;
          info.photoUrl = result.picture.data.url;
        });

        // all went well hence resolving the promise
        resolve(info);
      } else {
        // inform operation failure by invoking the reject
        reject();
      }
    })
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
