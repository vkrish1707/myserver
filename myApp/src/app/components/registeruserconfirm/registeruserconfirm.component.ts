import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IUser, UserSessionService } from '../../services/usersession.service';
import { Router } from '@angular/router';
import { AppRegisterService } from '../../services/app-register.service';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  constructor(private router: Router,
              private registerService: AppRegisterService,
              private session: UserSessionService) {}

  ngOnInit() {
  }

  onContinue() {
    this.oncontinue.emit(null);
  }

  onCancel() {
    this.registerService.data = null;
    this.router.navigate(['/home']);
  }
}
