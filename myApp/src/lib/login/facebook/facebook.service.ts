import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

import { ILogin } from '../login';
import { tokenKey } from '@angular/core/src/view';

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

  public login(): Observable<boolean> {

    this.token = new Observable(result => {
    });

    // create subjects - one to track login completion and another to track data fetching
    let resultLogin = new Subject<string>();
    let resultFetchData = new Subject<boolean>();

    // call back for FB.login
    let oncomplete = (response) => {
      resultLogin.next((response.authResponse != null) ? response.authResponse.accessToken : null);
    };

    // invoke facebook login
    FB.login(oncomplete, { scope: 'public_profile, email', return_scopes: true });
 
    // call back for FB.api
    let saveData = (response) => {
      this.firstName = response.first_name;
      this.lastName = response.last_name;
      this.email = response.email;
      this.photoUrl = response.picture.data.url;
      console.log('got the data successfully');
      resultFetchData.next(true);
    };

    // add an action response to login completion
    resultLogin.subscribe((token) => {
      if (token == null) {
        resultFetchData.next(false);
      } else {
        FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', saveData);
      }
    });

    // return
    return resultFetchData.asObservable();
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
