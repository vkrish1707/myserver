import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../../../lib/login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild(LoginComponent) login: LoginComponent;

  constructor() { }

  ngOnInit() {
  }

  loginSuccess($event) {
    console.log(this.login.provider);
    console.log(this.login.token);
  }
}
