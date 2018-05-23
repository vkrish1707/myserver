import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

@Injectable()
export class UserSessionService implements HttpInterceptor {

  private jwt: any = null;
  private sessionInfo: ILogin = <ILogin>{};
  private userInfoSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.sessionInfo);

  constructor() {
  }

  public get data(): Observable<IUser> {
    return this.userInfoSubject.asObservable();
  }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.jwt}`
      }
    });
    console.log("in Interceptor");
    return next.handle(req);
  }


  public establish(info: ILogin): Promise<void> {
    this.sessionInfo = info;
    this.userInfoSubject.next(this.sessionInfo);

    // defining 'data' object to send the userDetails to
    // the server and save them to the database
    let data: IUser = {
      'firstName': this.sessionInfo.firstName,
      'lastName': this.sessionInfo.lastName,
      'email': this.sessionInfo.email,
      'photoUrl': this.sessionInfo.photoUrl
    }

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

      // sending access_token and 'data' object to server
      // to validate access-token, create jwt and
      // create user in the database
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/' + url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('token', this.sessionInfo.token);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.jwt = xhr.response;
        console.log(this.jwt);
      };
      xhr.send(JSON.stringify(data));

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

  public checkSession(res) {
    res.send(this.jwt);
  }

  public logOut() {
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
