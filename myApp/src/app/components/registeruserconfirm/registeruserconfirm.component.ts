import { Component, OnInit, Output, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { IUserInfo } from '../../services/usersession.service';
import { Router } from '@angular/router';
import { AppRegisterService } from '../../services/app-register.service';

@Component({
  selector: 'app-registeruserconfirm',
  templateUrl: './registeruserconfirm.component.html',
  styleUrls: ['./registeruserconfirm.component.css']
})

export class RegisteruserconfirmComponent implements OnInit, AfterViewInit {

  @Output() oncontinue: EventEmitter<any> = new EventEmitter;
  @Output() oncancel: EventEmitter<any> = new EventEmitter;

  constructor(private router: Router, private registerService: AppRegisterService) {}

  ngAfterViewInit() {
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
