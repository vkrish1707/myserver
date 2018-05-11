import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router';
import { ISessionInfo, UserSessionService, IUserInfo } from '../../services/usersession.service';
import { AppRegisterService } from '../../services/app-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private state: string = 'signin';

  constructor(private router: Router,
              private registerService: AppRegisterService,
              private sessionService: UserSessionService) { }

  ngOnInit() {
  }

  public loginSuccess(data: any) {
    this.registerService.data = <ISessionInfo> data;
    this.state = 'info';
  }

  private infoContinue() {
    this.state = 'eula';
  }

  private eulaAccept() {
    this.sessionService.establish(this.registerService.data).then(() => {
      this.state = 'complete';
      this.router.navigate(['/homewithsession']);
    });
  }

  private eulaCancel() {
    this.router.navigate(['/home']);
  }
}
