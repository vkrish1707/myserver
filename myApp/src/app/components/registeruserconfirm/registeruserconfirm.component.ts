import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;


  constructor(private userSessionService: UserSessionService, private router: Router) {
  }

  ngOnInit() {
  }

  onContinue() {
    this.oncontinue.emit(null);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

}