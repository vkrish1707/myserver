import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
import * as hello from 'hellojs/dist/hello.all.js';


import { BaseLoginProvider } from '../base/provider.base';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'lib-microsoft',
  templateUrl: './microsoft.component.html',
  styleUrls: ['./microsoft.component.css']
})

export class MicrosoftComponent extends BaseLoginProvider implements OnInit {

  public providerID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: string;
  public providerName: string = 'microsoft';

  private config = {
    appId: '1c2981ca-6ec8-40c0-9842-41ce9e8ddc01',
    scope: 'User.Read User.ReadBasic.All'
  };

  constructor(private service: LoginService) {
    super(service);
    this.initAuth();
  }

  disabled: boolean;

  ngOnInit() {
  }

  private async onLogin() {
    await this.run();
    this.success(this);
  }


  protected freeze(value: boolean) {
    console.log('facebook==it worked', value);
    this.disabled = value;
  }

  change() {
    this.click();
  }

  // ========================
  // methods of microsoft
  // ========================
  public initAuth() {
    hello.init({
      msft: {
        id: this.config.appId,
        oauth: {
          version: 2,
          auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
        },
        scope_delim: ' ',
        form: false
      },
    },
      { redirect_uri: 'http://localhost:4200' }
    );
  }

  public async run(): Promise<void> {

    // lock all providers
    this.service.lock();

    let task = new Subject<void>();

    try {
      await this.login();

      if (this.token == null) {
        task.error('unexpected error -- oauth token missing -- cannot get profile data from microsoft');
      } else {
        await this.getMe(task);
      }
    }
    catch (error) {
      this.cancelled();
      // release all providers
      this.service.release();

      console.log(error);
    }

    return task.asObservable().toPromise();
  }

  private async login(): Promise<void> {
    let task = new Subject<void>();

    await hello('msft').login({ scope: this.config.scope })
      .then(res => {
        this.getAccessToken();
        task.complete();
      });

    return task.asObservable().toPromise();
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      hello('msft').logout()
        .then(res => {
          resolve()
        });
    });
  }

  private getAccessToken() {
    let msft = hello('msft').getAuthResponse();
    this.token = msft.access_token;
    return this.token;
  }

  private getClient(): MicrosoftGraphClient.Client {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
        done(null, this.getAccessToken());
      }
    });
    return client;
  }

  private getMe(task: Subject<void>): void {
    var client = this.getClient();
    client.api('me')
      .select("id, givenName, surname, mobilePhone, userPrincipalName")
      .get()
      .then((res => {
        this.email = res.userPrincipalName;
        this.providerID = res.id;
        this.firstName = res.givenName;
        this.lastName = res.surname;
        this.getProfilePicture(task);
        task.complete();
      }));
  }

  private getProfilePicture(task: Subject<void>): void {
    var client = this.getClient();
    client.api('me/photo/$value').get()
      .then((res => {
        this.photoUrl = JSON.stringify(res);
        task.complete();
      }))
  }
}
