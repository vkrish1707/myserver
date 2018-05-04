import { Component, AfterViewInit, OnInit } from '@angular/core';
import { error } from 'util';
import { BaseLoginProvider } from '../base/provider.base';
import { tokenName } from '@angular/compiler';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

declare const gapi: any;

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, AfterViewInit {

  Name: 'Google';
  EMail: string;
  PhotoUrl: string;

  public token: any;
  public user: any;

  constructor(private http: Http) {
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
    console.log("token for the googlr Authentication: ", id_token);
    console.log(googleUser.getBasicProfile());

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000/api/auth/google');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('googleToken', id_token);
    // xhr.send();
  };

  onFailure(googleUser) {
    this.cancelled();
  };

  logoff(): void {
    throw new Error('Method not Implemented.');    
  };
}
