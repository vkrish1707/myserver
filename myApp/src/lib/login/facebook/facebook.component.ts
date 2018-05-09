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
  userName: string
  email: string;
  photoUrl: string;

  constructor(private loginService: FacebookService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.launch()
      .then(token => {
        this.userName = this.loginService.userName;
        this.email = this.loginService.email;
        this.photoUrl = this.loginService.photoUrl;
        this.success(token); })
      .catch(()=> this.cancelled());
  }

  logoff(): void {
    throw new Error('Method not implemented.');
  }
}
