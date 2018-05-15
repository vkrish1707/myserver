import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ILogin } from '../login';
import { resolve } from 'url';

declare const FB: any;

@Injectable()
export class FacebookService {

  constructor(private http: Http) {
    FB.init({
      appId: '1820292001598094',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
  }

  launch(): Promise<ILogin> {
    return new Promise<ILogin>(this.run);
  }

  public run(resolve, reject) {
    FB.login(
      response => {
        let info = <ILogin>{};
        if (response.authResponse) {
          info.providerName = 'facebook';
          info.token = response.authResponse.accessToken;
          FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function(result) {
            info.firstName = result.first_name;
            info.lastName = result.last_name;
            info.email = result.email;
            info.photoUrl = result.picture.data.url;
            resolve(info);
          });

        } else {

          // authetication is failed or cancelled
          // let caller handle it via reject
          reject();
        }
      },
      {
        scope: 'public_profile, email', return_scopes:true
      }
    );
  }

  fbLogout(): Promise<ILogin> {
    console.log('fbLogout from facebook-service is called');

    return new Promise<ILogin>((resolve,reject) => {
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
      })
    })
  }
}
