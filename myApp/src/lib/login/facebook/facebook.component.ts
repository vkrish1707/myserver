import { Component, OnInit } from '@angular/core';
import { FacebookService } from './facebook.service';
import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';

@Component({
  selector: 'lib-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent extends BaseLoginProvider implements OnInit {

  constructor(private facebookService: FacebookService) {
    super();
  }

  ngOnInit() {
  }

  login() {
    this.facebookService.launch()
    .then((data) => {
      this.success(data);
    })
  }

  logOff() {
    this.facebookService.logout();
  }
}
