import { Component, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { LinkedinService } from './linkedin.service';

@Component({
  selector: 'lib-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})

export class LinkedinComponent extends BaseLoginProvider implements OnInit {

  providerName = 'linkedin';
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  token: any;

  constructor(private linkedinService: LinkedinService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.linkedinService.launch()
      .then(data => {
        this.token = data.token;
        console.log(this.token);
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.photoUrl = data.photoUrl;
        this.success();
      });
  }

  logOff(): void {
    this.linkedinService.linkedinLogoff();
  }
}
