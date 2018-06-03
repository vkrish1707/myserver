import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ILogin, UserSessionService, IUser } from '../../services/usersession.service';
import { AppRegisterService } from '../../services/app-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private state: string = 'signin';
  disabled:boolean= true;

  constructor(private router: Router,
              private registerService: AppRegisterService,
              private sessionService: UserSessionService) { }

  ngOnInit() {
  }

  public async loginSuccess(data: any) {
    console.log('login sucesss');
    this.registerService.data = <ILogin> data;
    await this.registerService.checkUser();
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

  private stateChange1() {
    console.log('onclick event catched sct1');
  }

  private stateChange2() {
    console.log('onclick event catched sct2');
  }

  private onLoginCancel() {
    // this.state = 'signin';
    console.log('test event catched');
    
  }

}
