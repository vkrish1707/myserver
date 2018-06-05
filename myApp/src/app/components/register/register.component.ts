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
    this.registerService.data = <ILogin> data;
    await this.registerService.checkUser();
    // if ( ) {
    //   this.dialogBox();
    // }
    this.state = 'info';
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

  private infoCancel() {
    this.registerService.data.logout();
    this.router.navigate(['/home']);
  }

  private eulaAccept() {
    this.sessionService.establish(this.registerService.data).then(() => {
      this.state = 'complete';
      this.router.navigate(['/homewithsession']);
    });
  }

  private eulaCancel() {
    this.registerService.data.logout();
    this.router.navigate(['/home']);
  }
}
