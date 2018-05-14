import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';
import { LoginService } from '../../lib/login/login.service';

@Injectable()
export class UserSessionService {

  private jwt: any;
  private sessionInfo: ISessionInfo = <ISessionInfo>{};
  private userInfoSubject: BehaviorSubject<IUserInfo> = new BehaviorSubject<IUserInfo>(this.sessionInfo);

  constructor(private http: Http, private loginService: LoginService) {
  }

  public get data(): Observable<IUserInfo> {
    return this.userInfoSubject.asObservable();
  }

  public establish(info: ISessionInfo): Promise<void> {
    this.sessionInfo = info;
    this.userInfoSubject.next(this.sessionInfo);

    let establishPromise = (resolve, reject) => {
      setTimeout(() => console.log('timer done'), 3000);
      let url: string = null;
      
      if (this.sessionInfo.providerName === 'google') {
        url = 'api/auth/google';
      }
      else if (this.sessionInfo.providerName === 'facebook') {
        url = 'api/auth/facebook';
      }
      else if (this.sessionInfo.providerName === 'microsoft') {
        url = 'api/auth/microsoft';
      }
      else if (this.sessionInfo.providerName === 'linkedin') {
        url = 'api/auth/linkedin';
      }
      else {
        throw new Error('Unsupported provider');
      }

      // sending access_token to server to validate and create jwt
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/' + url);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('token', this.sessionInfo.token);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.jwt = JSON.stringify(xhr.response);
        console.log(this.jwt);
      };
      xhr.send();

      if (xhr.response != null) {
        resolve();
      }
      else {
        reject();
      }
    }

    // invoke the promise
    return new Promise(establishPromise);
  }

  logOff() {
    if (this.sessionInfo.providerName != 'microsoft') {
      this.loginService.logoff();
    }
    else {
      this.loginService.logout();
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
