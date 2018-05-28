import { Component, OnInit } from '@angular/core';

import { BaseLoginProvider } from '../base/provider.base';
import { MicrosoftService } from './microsoft.service';

@Component({
  selector: 'lib-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.css']
})

export class MicrosoftComponent extends BaseLoginProvider implements OnInit {

  constructor(private microsoftService: MicrosoftService) {
    super();
    this.microsoftService.initAuth();
  }

  ngOnInit() {
  }

  private async onLogin() {
    await this.microsoftService.run();
    this.success(this.microsoftService);
  }
}
