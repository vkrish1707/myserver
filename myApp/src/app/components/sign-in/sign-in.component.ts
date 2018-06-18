import { Component, OnInit } from '@angular/core';
import { AppRegisterService } from '../../services/app-register.service';
import { ILogin, UserSessionService } from '../../services/usersession.service';
import { Router } from '@angular/router';
import { DialogBoxButtons, showDialog } from '../../../lib/dialogbox/dialogbox';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  public dialogResult;

  constructor(private registerService: AppRegisterService,
    private router: Router,
    private sessionService: UserSessionService) { }

  ngOnInit() {
  }

  public async loginSuccess(data: any) {
    this.registerService.data = <ILogin>data;

    let newUser: boolean = await this.registerService.checkUser();
    if (newUser == true) {

      console.log('return == true');
      this.sessionService.establish(data);
      this.router.navigate(['/homewithsession']);
    } else {
      await this.dialogBox();
      console.log('return == false');
    }
  }

  async dialogBox() {
    console.log('dialogBox');
    this.dialogResult = await showDialog(
      'User Not Registered',
      'User Not Registered.Redirecting you to regiter page',
      DialogBoxButtons.OkCancel
    );

    if (this.dialogResult == 2) {
      this.router.navigate(['/register']);
    } else {
      this.registerService.data.logout();
      this.router.navigate(['/home']);
    }
    }

}

