import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

import { ILogin } from '../login';
import { BaseLoginProvider } from '../base/provider.base';
import { LoginService } from '../login.service';

declare const FB: any;

@Injectable()
export class FacebookService extends BaseLoginProvider implements ILogin {

  // interface members
  public providerID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'facebook';

  constructor(private service: LoginService) {
    super(service)

    FB.init({
      appId: '1820292001598094',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
  }

  public getStatus(): Promise<string> {
    let result = new Subject<string>();
    FB.getLoginStatus((response) => {
      result.next(response.status);
      result.complete();
    });

    // return
    return result.asObservable().toPromise();
  }

  public async run(): Promise<void> {

    // create subject - this acts a medium to track login completion
    let task = new Subject<void>();

    try {

      // attempt to login
      await this.login();

      // if everyting is ok, attempt to get the profile data
      if (this.token == null) {
        task.error('unexpected error -- oauth token missing -- cannot get profile data from facebook');
      } else {
        await this.updateProfile(task);
      }
    }
    catch (error) {
      console.log(error);
    }

    // return
    return task.asObservable().toPromise();
  }

  private login(): Promise<void> {

    // create subject - this acts a medium to track login completion
    let task = new Subject<void>();

    // lock other providers
    this.service.lock();
    
    // invoke facebook login
    FB.login(
      (response) => {
        if (response.authResponse != null) {
          this.token = response.authResponse.accessToken;
          task.complete();
        } else {
          this.service.release();
          task.error('login operation failed/cancelled');
          this.cancelled();
        }
      },
      {
        scope: 'public_profile, email',
        return_scopes: true
      }
    );

    // return
    return task.asObservable().toPromise();
  }

  private updateProfile(task: Subject<void>): void {

    FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}',
      (response) => {
        this.providerID = response.id;
        this.firstName = response.first_name;
        this.lastName = response.last_name;
        this.email = response.email;
        this.photoUrl = response.picture.data.url;
        task.complete();
      }
    );
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      FB.getLoginStatus(function (response) {
        if (response && response.status === 'connected') {
          FB.logout(function (response) {
            resolve();
          });
        }
        else {
          reject();
        }
      });
    });
  }

  protected freeze(value: boolean) {
    console.log('facebook==it worked');
  }
}
