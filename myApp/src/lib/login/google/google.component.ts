import { Component, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { GoogleService } from './google.service';
import { ILogin } from '../login';

declare const gapi: any;

@Component({
  selector: 'lib-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, ILogin {

  // interface members
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'google';

  protected auth2: any;

  constructor(private googleService: GoogleService) {
    super();
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
    return new Promise((resolve, reject) => {
      let promise = this.auth2.signIn();

      promise.then(() => {
        let profile = this.auth2.currentUser.get().getBasicProfile();
        let backendToken = this.auth2.currentUser.get().getAuthResponse(true).id_token;

        // user.id = profile.getId();
        this.email = profile.getEmail();
        this.photoUrl = profile.getImageUrl();
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
    console.log('google-logout implemented');
    return new Promise((resolve, reject) => {
      if (!gapi.auth2) {
        gapi.load('auth2', function () {
          gapi.auth2.init();
          var auth2 = gapi.auth2.getAuthInstance();
          this.auth2.signOut().then((err: any) => {
            if (err) {
              reject(err);
            } else {
              this.auth2.disconnect();
              resolve();
            }
          }).catch((err: any) => {
            reject(err);
          });
        });
      }
    });
  }
}
