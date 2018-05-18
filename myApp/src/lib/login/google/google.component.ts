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

  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  token: any;
  public get providerName(): string {
    return 'google';
  }


  constructor(private googleService: GoogleService) {
    super();
  }

  ngOnInit() {
    gapi.signin2.render('my-signin2', {
      'onsuccess': param => this.onSignIn(param),
      'onfailure': param => this.onFailure(param),
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
  }

  public onSignIn(googleUser: any) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    this.token = id_token;
    this.firstName = profile.ofa;
    this.lastName = profile.wea;
    this.email = profile.U3;
    this.photoUrl = profile.Paa;
    this.success(this);
  };

  public onFailure(googleUser: any) {
    this.cancelled();
  };

  public logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }).catch((err: any) => {
        reject(err);
      });
    });
  }
}
