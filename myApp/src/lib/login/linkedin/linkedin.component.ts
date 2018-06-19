import { Component, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';
import { LoginService } from '../login.service';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LinkedinService } from './linkedin.service';

declare var IN: any;

@Component({
  selector: 'lib-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})

export class LinkedinComponent extends BaseLoginProvider implements OnInit {

  constructor(private service: LoginService, private http: Http, private Lservice: LinkedinService) {
    super(service);
  }

  disabled: boolean

  ngOnInit() {
  }

  // client_id = 78ov5vlwhek3gu;
  redirect_uri:String = encodeURI("http://localhost:4200/");
  url1 = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78ov5vlwhek3gu&redirect_uri=" + this.redirect_uri;
  url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78ov5vlwhek3gu&redirect_uri=http%3A%2F%2Flocalhost:4200%2F&state=987654321&scope=r_basicprofile";

  
  async login() {
    // window.location.href = this.url;
    // this.http.get(this.url);
    this.Lservice.obtainAuthCode()
  }

  log() {

    return this.http.get(this.url)    
    }

  logOff() {
    // this.linkedinService.logout();
  }

  onClick() {
    this.service.lock();
  }


  protected freeze(value: boolean) {
    console.log('linkedin==it worked');
    this.disabled = value;
  }

}
