import { Injectable } from '@angular/core';
import { ILogin, IUser, UserSessionService } from './usersession.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AppRegisterService {

  public data: ILogin;

  constructor(private http: Http, private router: Router, private session: UserSessionService) { }

  public async checkUser(): Promise<boolean> {
    let result: boolean = false;
    let userData = {
      'providerID': this.data.providerID,
      'providerName': this.data.providerName,
      'firstName': this.data.firstName,
      'lastName': this.data.lastName,
      'email': this.data.email,
      'photoUrl': this.data.photoUrl
    };

    console.log('in chk user');
    
    try {
      let response = await this.http.post('http://localhost:3000/checkuser', userData).toPromise();
      console.log('res == ', response);
      if (response.status == 200) {
        result = true;
      } else {
        console.log('res2 from chk user');
        result = false;
      }
    }
    catch (err) {
      console.log('error', err);
    }

    // return
    return result;
  }
}
