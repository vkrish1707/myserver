import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSessionService, IUserInfo } from '../../services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  private user: IUserInfo;


  constructor(private userSessionService: UserSessionService, private router: Router) {
  }

  ngOnInit() {
    this.userSessionService.data.subscribe((info) => {
      console.log('from subscribe');
      console.log(info.firstName + ' ' + info.lastName );
    })
  }

  onContinue() {
    this.oncontinue.emit(null);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

}