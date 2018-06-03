import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';

import { ILogin } from '../login';
import { Http } from '@angular/http';

declare const IN: any;

@Injectable()
export class LinkedinService {

  public providerID: string;
  public firstName: string;
  public lastName: string;
  public photoUrl: string;
  public email: string;
  public token: string;
  public providerName: string = 'linkedin';
  public oauthToken: string;

  private APIKey = "78ov5vlwhek3gu";
  private APIKeySecret = "yF1vcU7ESIn8e0HI";
  private callbackURL = "http://localhost:4200/callback/";
  private APIVersion = "v1";
  private APIScope = 'r_basicprofile r_fullprofile r_emailaddress';

  constructor(private http: Http) { }

  public getRs() {
    var RandomState = function (howLong) {

      howLong = parseInt(howLong);

      if (!howLong || howLong <= 0) {
        howLong = 18;
      }
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";

      for (var i = 0; i < howLong; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(this.RandomState);

      }
      return text;

    }
  }

  public oauth() {
    this.http.get('https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=' + this.APIKey + '&scope=' + this.APIScope + '&state=RNDM_' + this.getRs + '&redirect_uri=' + this.callbackURL)
  }
}
  // public onLinkedInLoad() {
  //   IN.Event.on(IN, "auth", this.launch);
  // }

  // public launch(): Promise<ILogin> {
  //   return new Promise((resolve, reject) => {
  //     let that = this;
  //     IN.User.authorize(function (res) {
  //       IN.API.Raw('/people/~:(id,first-name,last-name,email-address,picture-url)').result(function (res: any) {
  //         that.providerID = res.id;
  //         that.email = res.emailAddress;
  //         that.photoUrl = res.pictureUrl;
  //         that.firstName = res.firstName;
  //         that.lastName = res.lastName;
  //         that.oauthToken = IN.ENV.auth.oauth_token;

  //         console.log('Inside authorize function', res);

  //         resolve(that);
  //       });
  //     });
  //   });
  // }

  // public getAt(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open('POST', 'https://www.linkedin.com/oauth/v2/accessToken');
  //     console.log('after post');

  //     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //     xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');
  //     console.log('after set header');
  //     console.log(this.oauthToken);

  //     xhr.send('grant_type=authorization_code&code=' + this.oauthToken + '&redirect_uri=' + 'http://localhost:4200/' + '&client_id=' + this.clientId + '&client_secret=' + this.clientScerect );

  //     xhr.onreadystatechange = () => {
  //       console.log('on ready state');

  //       if (xhr.readyState == 4 && xhr.status == 200) {
  //         console.log('in if');

  //         this.token = xhr.response;
  //         console.log('token======', this.token);
  //       }
  //       resolve();
  //     };

  //   })
    // if (xhr.responseText != null) {
    //   console.log(xhr.responseText);
    // } else {
    //   console.log('this is an error for xhr ');
    // }



  // public logout(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     IN.User.logout(function () {
  //       resolve();
  //     }, {});
  //   });
  // }
// }
