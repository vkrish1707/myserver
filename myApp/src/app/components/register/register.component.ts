import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../../../lib/login/login.component';
import { Http } from '@angular/http';
import { IUser } from '../../models/user.model';
import { RegisteruserconfirmComponent } from '../registeruserconfirm/registeruserconfirm.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  @ViewChild(LoginComponent) login: LoginComponent;
  @ViewChild(RegisteruserconfirmComponent) info: RegisteruserconfirmComponent;

  public jwt;
  private state: string = 'signin';

  constructor(private http: Http) { }

  ngOnInit() {
  }

  loginSuccess() {
    // this.http.get('http://localhost:3000/api/jwt')
    // .subscribe(data => console.log('jwt: ' + JSON.stringify(data)));
    console.log(this.login.provider);
    console.log(this.login.token);
    this.state = 'info';
  }

  infoContinue() {
    this.state = 'eula';
  }

  infoCancel() {
    this.state = 'signin';
  }

  eulaAceept() {
    this.state = 'progress';
  }
}