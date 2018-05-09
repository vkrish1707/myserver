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
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/auth/google');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader('token', gtoken);
      xhr.send();

      this.http.get('http://localhost:3000/gjwt').subscribe(res => {(this.jwt = res);
      console.log(this.jwt);
      });
    }
    //to do : call node server and get the jwt
  }
}

export interface IUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
}

export interface ISessionInfo extends IUserInfo {
  token: string;
  providerName: string;
}
