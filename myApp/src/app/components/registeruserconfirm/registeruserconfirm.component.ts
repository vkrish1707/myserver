import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSessionService } from '../../services/user-session.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  private userDetails: IUser[];

  constructor(private userSessionService: UserSessionService) {
    this.userSessionService.user.subscribe(data => this.userDetails = data);
  }

  ngOnInit() {
  }

  onContinue() {
    this.oncontinue.emit(null);
  }

  onCancel() {
    this.oncancel.emit(null);
  }

}