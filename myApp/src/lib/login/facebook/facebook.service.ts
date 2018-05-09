import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

declare const FB: any;

@Injectable()
export class FacebookService {

  public email: string;
  public firstName: string;
  public lastName: string;
  public photoUrl: string;

  constructor(private http: Http) {
    FB.init({
      appId: '1820292001598094',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
  }

  public get userName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  launch() {
    return new Promise(this.run);
  }

  public run(resolve, reject) {
    let that = this;
    FB.login(
      response => {
        let that2 = that;
        if (response.authResponse) {
          FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function(result) {
            console.log(result);
            that2.firstName = result.first_name;
            that2.lastName = result.last_name;
            that2.email = result.email;
            that2.photoUrl = result.picture;
            console.log(that.lastName);
          });

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
