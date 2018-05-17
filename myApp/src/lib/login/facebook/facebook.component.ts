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

  private login() {
    this.facebookService.login()
      .subscribe((result) => {
        if (result == true) {
          this.success(<ILogin> this.facebookService);
        } else {
          this.cancelled();
        }
      });
  }

  logOff() {
    this.facebookService.logout();
  }
}
