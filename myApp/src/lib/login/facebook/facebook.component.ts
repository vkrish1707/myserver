import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FacebookService } from './facebook.service';
import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'lib-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent extends BaseLoginProvider implements OnInit {

  constructor(private facebookService: FacebookService, private service: LoginService) {
    super(service)
  }

  disabled: boolean;

  ngOnInit() {
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

  protected freeze(value: boolean) {
    console.log('facebook==it worked', value);
    this.disabled = value;
  }

}
