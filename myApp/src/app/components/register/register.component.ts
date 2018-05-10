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
    this.sessionService.data.subscribe((info) => {
      console.log('from subscribe');
      console.log(info.firstName + ' ' + info.lastName );
    })
  }

  loginSuccess(data: any) {
    this.sessiondata = <ISessionInfo>data;
    console.log(this.sessiondata.providerName);
    console.log(this.sessiondata.token);
    console.log(this.sessiondata.firstName);
    this.state = 'info';
  }

  infoContinue() {
    this.state = 'eula';
  }

  eulaAceept() {
    this.state = 'progress';
    this.sessionService.establish(this.sessiondata).then(() => {
      this.state = 'complete';
      this.router.navigate(['/homewithsession']);
    });
  }

  eulaCancel() {
    this.state = 'home';
  }
}
