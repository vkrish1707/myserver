import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

@Injectable()
export class UserSessionService {

  private jwt: any;
  private sessionInfo: ISessionInfo = <ISessionInfo>{};
  private userInfoSubject: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(this.sessionInfo);

  constructor(private http: Http) {
  }

  public get data(): Observable<IUserInfo> {
    return this.userInfoSubject.asObservable();
  }

  public establish(info: ISessionInfo): void {
    this.sessionInfo = info;

    if (info.providerName === 'google') {
      var gtoken = info.token;

      // sending access_token to server to validate and create jwt
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/auth/google');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('tokeng', gtoken);
      xhr.send();

      // get JWT from server
      this.http.get('http://localhost:3000/gjwt').subscribe(res => {
        (this.jwt = JSON.stringify(res));
        console.log(this.jwt);
      });
    }

    else if (info.providerName === 'facebook') {
      var fbtoken = info.token;
      console.log('facebook-token from service ====== ', fbtoken);

      // sending access_token to server to validate and create jwt
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/auth/facebook');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('tokenf', fbtoken);
      xhr.send();

      // get JWT from server
      this.http.get('http://localhost:3000/fbjwt').subscribe(res => {
        (this.jwt = JSON.stringify(res));
        console.log(this.jwt);
      });
    }

    else if (info.providerName === 'microsoft') {
      var mstoken = info.token;
      console.log('microsoft-token from service ====== ', mstoken);

      // sending access_token to server to validate and create jwt
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/auth/microsoft');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('tokenm', mstoken);
      xhr.send();

      // get JWT from server
      // this.http.get('http://localhost:3000/msjwt').subscribe(res => {
      //   (this.jwt = JSON.stringify(res));
      //   console.log(this.jwt);
      // });
    }
  }
}

export class IUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
}

export interface ISessionInfo extends IUserInfo {
  token: string;
  providerName: string;
}
