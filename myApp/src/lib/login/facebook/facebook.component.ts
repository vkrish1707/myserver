import { Component, OnInit } from '@angular/core';
import { FacebookService } from './facebook.service';
import { BaseLoginProvider } from '../base/provider.base';

@Component({
  selector: 'lib-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent extends BaseLoginProvider implements OnInit {

  providerName = 'facebook';
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  token: any;

  constructor(private loginService: FacebookService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.launch()
      .then(fbtoken => {
        this.token = fbtoken;
        this.firstName = this.loginService.firstName;
        this.lastName = this.loginService.lastName;
        this.email = this.loginService.email;
        this.photoUrl = this.loginService.photoUrl;
        this.success(); })
      .catch(()=> this.cancelled());
  }

  logoff(): void {
    throw new Error('Method not implemented.');
  }
}
