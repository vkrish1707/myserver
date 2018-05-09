import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IUser } from '../../../app/models/user.model';

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
        if (response.authResponse) {
          FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function(result) {
            that.firstName = result.first_name;
            that.lastName = result.last_name;
            that.email = result.email;
            that.photoUrl = result.picture;
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
