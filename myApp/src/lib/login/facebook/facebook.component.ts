import { Component, OnInit } from '@angular/core';
import { FacebookService } from './facebook.service';
import { BaseLoginProvider } from '../base/provider.base';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent extends BaseLoginProvider implements OnInit {

  Name = 'facebook';
  EMail: string;
  PhotoUrl: string;

  constructor(private loginService: FacebookService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.launch()
      .then(token => { this.success(token); })
      .catch(()=> this.cancelled());
  }

  logoff(): void {
    throw new Error('Method not implemented.');
  }
}

