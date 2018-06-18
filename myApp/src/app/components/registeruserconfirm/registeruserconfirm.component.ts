import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { IUser, UserSessionService } from '../../services/usersession.service';
import { Router } from '@angular/router';
import { AppRegisterService } from '../../services/app-register.service';
import { showDialog, DialogBoxButtons } from '../../../lib/dialogbox/dialogbox';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;

  public dialogResult;
  disabled:boolean = false;

  constructor(private router: Router,
              private registerService: AppRegisterService,
              private session: UserSessionService
            ) {}

  ngOnInit() {
  }

  onContinue() {
    this.oncontinue.emit(null);
  }

  async dialogBox() {
    console.log('dialogBox');    
    this.dialogResult = await showDialog('Decline Confirmation', 'Are you sure?', DialogBoxButtons.YesNo);
    if (this.dialogResult == 0) {
      console.log('inside if');      
      this.registerService.data.logout();
      this.router.navigate(['/home']);
    }
  }
}
