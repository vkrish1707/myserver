import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { Http } from '@angular/http';

@Injectable()
export class UserSessionService {

  private jwt: any;
  private sessionInfo: ILogin = <ILogin>{};
  private userInfoSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.sessionInfo);

  constructor(private http: Http) {
  }

  public get data(): Observable<IUser> {
    return this.userInfoSubject.asObservable();
  }

  public establish(info: ILogin): Promise<void> {
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

  logOut() {
    this.sessionInfo.logout();
  }
}

export class IUser {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
}

export interface ILogin extends IUser {
  token: string;
  providerName: string;
  logout(): void;
}
