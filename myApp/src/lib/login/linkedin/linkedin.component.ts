import { Component, OnInit } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { LinkedinService } from './linkedin.service';
import { ILogin } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'lib-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})

export class LinkedinComponent extends BaseLoginProvider implements OnInit {

  constructor(private linkedinService: LinkedinService, private service: LoginService) {
    super(service);
  }

  disabled: boolean = true;

  ngOnInit() {
  }

  private async login() {
    this.linkedinService.oauth();
    // await this.linkedinService.launch();
    // await this.linkedinService.getAt();
    // this.success(<ILogin>this.linkedinService);
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
