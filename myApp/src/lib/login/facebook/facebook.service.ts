import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ILoginInfo } from '../login';

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

  launch(): Promise<ILoginInfo> {
    return new Promise<ILoginInfo>(this.run);
  }

  public run(resolve, reject) {
    FB.login(
      response => {
        let info = <ILoginInfo>{};
        if (response.authResponse) {
          info.providerName = 'facebook';
          info.token = response.authResponse.accessToken;
          FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}', function(result) {
            info.firstName = result.first_name;
            info.lastName = result.last_name;
            info.email = result.email;
            info.photoUrl = result.picture;
            resolve(info);
          });

          console.log('still in run');
          console.log(info.lastName);  
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
