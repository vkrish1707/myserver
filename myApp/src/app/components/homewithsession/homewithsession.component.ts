import { Component, OnInit, Compiler, Output, EventEmitter } from '@angular/core';
import { UserSessionService, IUser, ILogin } from '../../services/usersession.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-homewithsession',
  templateUrl: './homewithsession.component.html',
  styleUrls: ['./homewithsession.component.css']
})

export class HomewithsessionComponent implements OnInit {

  public info: IUser;

  constructor(private session: UserSessionService, private router: Router, private http: Http) {
   }


  ngOnInit() {
    this.session.data.subscribe(info => this.info = info);
  }

  async logOff() {
    let userData = {
      'providerID': this.info.providerID,
      'providerName':this.info.providerName,
      'firstName': this.info.firstName,
      'lastName': this.info.lastName,
      'email': this.info.email,
      'photoUrl': this.info.photoUrl
    };

    await this.http.post('http://localhost:3000/logoff', userData)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    this.session.logOut();
    this.router.navigate(['/home']);
  }
}
