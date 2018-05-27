import { Injectable } from '@angular/core';
import { ILogin, IUser, UserSessionService } from './usersession.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AppRegisterService {

  public data: ILogin;

  constructor(private http: Http, private router: Router, private session: UserSessionService) { }

  public checkUser() {

    let userData: IUser = {
      'providerID': this.data.providerID,
      'firstName': this.data.firstName,
      'lastName': this.data.lastName,
      'email': this.data.email,
      'photoUrl': this.data.photoUrl
    };

    this.http.post('http://localhost:3000/checkuser', userData)
      .subscribe(
        res => {
          console.log(res)
          this.session.establish(this.data);
          this.router.navigate(['/homewithsession']);
        },
        err => console.log(err)
      )
  }

  public

}
