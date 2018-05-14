import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { GoogleService } from './google.service';

declare const gapi: any;

@Component({
  selector: 'lib-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, AfterViewInit {

  providerName = 'google';
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  token: any;

  constructor(private googleService: GoogleService) {
    super();
  }

  ngAfterViewInit() {
  }

  ngOnInit() {
      gapi.signin2.render('my-signin2', {
        'onsuccess': param => this.onSignIn(param),
        'onfailure': param => this.onFailure(param),
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark'
      });  
    }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    this.token = id_token;
    this.firstName = profile.ofa;
    this.lastName = profile.wea;
    this.email = profile.U3;
    this.photoUrl = profile.Paa;
    this.success();
  };

  onFailure(googleUser) {
    this.cancelled();
  };  
}