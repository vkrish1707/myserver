import { Component, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';

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

  constructor() {
    super();
  }

  ngOnInit() {
  }

  logoff(): void {
    throw new Error('Method not implemented.');
  }
}
