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

  test() {
    this.state();
  }

  private async login() {
    // check the status first
    let status = await this.facebookService.getStatus();

    // attempt login
    await this.facebookService.run();
    this.success(<ILogin>this.facebookService);
  }

  logOff() {
    this.facebookService.logout();
  }
}
