import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ILogin, UserSessionService, IUser } from '../../services/usersession.service';
import { AppRegisterService } from '../../services/app-register.service';
import { showDialog, DialogBoxButtons } from '../../../lib/dialogbox/dialogbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  private state: string = 'signin';
  public dialogResult;

  constructor(private router: Router,
    private registerService: AppRegisterService,
    private sessionService: UserSessionService) { }

  ngOnInit() {
  }

  public async loginSuccess(data: any) {
    console.log('login sucesss');

    this.registerService.data = <ILogin>data;
    
    let newUser: boolean = await this.registerService.checkUser();
    if (newUser == true) {
      this.dialogBox();
      this.sessionService.establish(data);
      console.log('return == true');
    } else {
      console.log('return == false');
      this.state = 'info';
    }
  }

  async dialogBox() {
    this.dialogResult = await showDialog(
      'Already registered',
      'User Already registered .Redirecting you to Home',
      DialogBoxButtons.OkCancel
    );

    if (this.dialogResult == 2) {
      this.router.navigate(['/homewithsession']);
    } else {
      this.registerService.data.logout();
      this.router.navigate(['/home']);
    }
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

  private change() {
    console.log('onclick event catched sct1');
  }

  private onLoginCancel() {
    // this.state = 'signin';
    console.log('test event catched');

  }

}
