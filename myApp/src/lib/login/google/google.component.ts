import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';
import { LoginService } from '../login.service';

declare const gapi: any;

@Component({
  selector: 'lib-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, ILogin {

disabled: boolean;

  // interface members
  public providerID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'google';

  protected auth2: any;

  constructor(private service: LoginService) {
    super(service);
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        scope: 'email',
        client_id: '284779082637-o4uhhhiirkb7j89r8qd0jfkfmddnmq94.apps.googleusercontent.com'
      });
    })
  }

  ngOnInit() {
  }

  public signIn(): Promise<ILogin> {

    // lock all providers
    this.service.lock();

    // invoke google login
    return new Promise((resolve, reject) => {
      let promise = this.auth2.signIn();

      promise.then(() => {
        let profile = this.auth2.currentUser.get().getBasicProfile();
        let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

        this.providerID = profile.getId();
        this.email = profile.getEmail();
        this.photoUrl = profile.Paa;
        this.firstName = profile.getGivenName();
        this.lastName = profile.getFamilyName();
        this.token = backendToken;
        resolve(this);
        this.success(this);
      }).catch((error) => {
        console.log(error);
        this.cancelled();
        // reject(err);

        // release all providers
        this.service.release();
        
      });
    });
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:4200";
          auth2.disconnect();
          resolve();
        }
      }).catch((err: any) => {
        reject(err);
      });
    });
  }

  protected freeze(value: boolean) {
    console.log('google==it worked');
    this.disabled = value;
  }

  change() {
    // console.log('loading hey from component');
    this.click();
  }

}
