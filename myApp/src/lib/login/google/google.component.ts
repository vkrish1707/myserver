import { Component, OnInit } from '@angular/core';

import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';
import { environment } from '../../../environments/environment';

declare const gapi: any;

@Component({
  selector: 'lib-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, ILogin {

  // interface members
  public providerID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'google';

  protected auth2: any;

  constructor() {
    super();
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        scope: 'email',
        client_id: environment.google.client_id
      });
    })
  }

  ngOnInit() {
  }

  public signIn(): Promise<ILogin> {
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
      }).catch((err: any) => {
        reject(err);
        this.cancelled();
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
          document.location.href = environment.google.logout;
          auth2.disconnect();
          resolve();
        }
      }).catch((err: any) => {
        reject(err);
      });
    });
  }
}
