import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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

  launch() {
    return new Promise(this.run);
  }

  private run(resolve, reject) {
    FB.login(
      response => {
        if (response.authResponse) {
          var fbToken  = response.authResponse.accessToken;
          var userID = response.authResponse.userID;
          console.log('the token is ', fbToken);
          console.log(response);

          // send token to server
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:3000/api/auth/facebook');
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('token2', fbToken);
          xhr.send();
          // authentication was successful
          // return (via resolve) the access token to the caller
          resolve(response.authResponse.accessToken);
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
}
