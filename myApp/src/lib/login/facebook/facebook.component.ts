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

  constructor(private facebookService: FacebookService) {
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
        this.success(this.facebookService); })
      .catch(()=> this.cancelled());
  }

  logOff() {
    this.facebookService.logout();
  }
}
