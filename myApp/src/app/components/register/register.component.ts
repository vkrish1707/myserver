import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { RegisteruserconfirmComponent } from '../registeruserconfirm/registeruserconfirm.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild(RegisteruserconfirmComponent) info: RegisteruserconfirmComponent;

  private state: string = 'signin';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loginSuccess(data: any) {
    let info = <ILoginInfo> data; 
    console.log(info.providerName);
    console.log(info.token);
    console.log(info.lastName);
    this.state = 'info';
  }

  infoContinue() {
    this.state = 'eula';
  }

  infoCancel() {
    this.state = 'home';
  }

  eulaAceept() {
    this.state = 'progress';
  }

  eulaCancel() {
    this.state = 'home';
  }
}

interface ILoginInfo {
  token: string;
  providerName: string;
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
}
