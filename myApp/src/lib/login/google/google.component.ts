import { Component, AfterViewInit, OnInit, Output } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

declare const gapi: any;

@Component({
  selector: 'lib-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.css']
})

export class GoogleComponent extends BaseLoginProvider implements OnInit, AfterViewInit {

  Name: string = 'Google';
  EMail: string;
  PhotoUrl: string;

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
    console.log(profile);
  

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/auth/google');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('token', id_token);
    xhr.send();
    this.success();
  };

  onFailure(googleUser) {
    this.cancelled();
  };

  logoff(): void {
    throw new Error('Method not Implemented.');    
  };
}
