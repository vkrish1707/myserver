import { Injectable } from '@angular/core';
import { ILogin, IUser, UserSessionService } from './usersession.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AppRegisterService {

  public data: ILogin;
  public date = new Date();

  constructor(private http: Http, private router: Router, private session: UserSessionService) { }

  public checkUser() {
    let userData = {
      'providerID': this.data.providerID,
      'providerName':this.data.providerName,
      'firstName': this.data.firstName,
      'lastName': this.data.lastName,
      'email': this.data.email,
      'photoUrl': this.data.photoUrl,
      'loginDate': this.date.toLocaleString()
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
}
