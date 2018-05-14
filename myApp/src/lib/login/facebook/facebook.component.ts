import { Component, OnInit } from '@angular/core';
import { FacebookService } from './facebook.service';
import { BaseLoginProvider } from '../base/provider.base';
import { LoginService } from '../login.service';

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

  constructor(private facebookService: FacebookService, private loginService: LoginService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.facebookService.launch()
      .then(data => {
        this.token = data.token;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.photoUrl = data.photoUrl;
        this.success(); })
      .catch(()=> this.cancelled());
  }

  logoff() {
    this.loginService.logoff()
      .then(() => {
        this.signout();
        console.log('logoff from facebook implemented');
      });
    // throw new Error('Method not implemented.');
  }
}
