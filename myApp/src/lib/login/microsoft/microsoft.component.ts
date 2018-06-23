import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
import * as Msal from 'msal';


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
    appId: 'e5fe74b6-d86e-4bf4-957e-ba5c562e4b61',
    scope: ['User.Read User.ReadBasic.All']
  };

  private app: any;

  constructor(private service: LoginService) {
    super(service);
    //intialising app and call back for login redirect
    this.app = new Msal.UserAgentApplication(
      this.config.appId,
      '',
      () => {
      }); // call back for login redirect
  }

  disabled: boolean;

  ngOnInit() {
  }

  private async onLogin() {
    await this.run();
    this.success(this);
  }


  protected freeze(value: boolean) {
    console.log('microsoft==it worked', value);
    this.disabled = value;
  }

  change() {
    this.click();
  }

  // ========================
  // methods of microsoft
  // ========================

  public login() {
    return this.app.loginPopup(this.config.scope)
      .then(idToken => {
        const user = this.app.getUser();
        if (user) {
          return this.getAccessToken().then(token => token);
        } else {
          return null;
        }
      }, () => {
        return null;
      });
  }

  public async run(): Promise<void> {

    let task = new Subject<void>();

    try {
      await this.login();

      if (this.token == null) {
        // task.error('unexpected error -- oauth token missing -- cannot get profile data from microsoft');
        this.cancelled();
      } else {
        await this.getMe(task);
      }
    }
    catch (error) {
      console.log(error);
    }

    return task.asObservable().toPromise();
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.app.logout()
        .then(res => {
          resolve()
        });
    });
  }

  public getAccessToken() {
    return this.app.acquireTokenSilent(this.config.scope)
      .then(accessToken => {
        this.token = accessToken
        return this.token;
      }, error => {
        return this.app.acquireTokenPopup(this.config.scope)
          .then(accessToken => {
            this.token = accessToken
            return this.token;
          }, err => {
            console.error(err);
          });
      });
  }

  private getClient(): MicrosoftGraphClient.Client {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
        done(null, this.token);
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
