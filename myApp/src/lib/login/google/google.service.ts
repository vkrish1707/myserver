import { Injectable, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';

declare const gapi: any;

@Injectable()
export class GoogleService {

  constructor() {
  }

  signOut(): Promise<any> {
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
