import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { RegisteruserconfirmComponent } from '../registeruserconfirm/registeruserconfirm.component';
import { Router } from '@angular/router';
import { ISessionInfo, UserSessionService, IUserInfo } from '../../services/usersession.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild(RegisteruserconfirmComponent) info: RegisteruserconfirmComponent;

  private state: string = 'signin';
  private sessiondata: ISessionInfo;

  constructor(private http: Http, private router: Router, private sessionService: UserSessionService) { }

  ngOnInit() {
  }

  loginSuccess(data: any) {
    this.sessiondata = <ISessionInfo> data; 
    console.log(this.sessiondata.providerName);
    console.log(this.sessiondata.token);
    console.log(this.sessiondata.firstName);
    this.state = 'info';
  }

  infoContinue() {
    this.state = 'eula';
  }

  eulaAceept() {
    this.sessionService.establish(this.sessiondata);
    this.state = 'progress';
  }

  eulaCancel() {
    this.state = 'home';
  }
}
