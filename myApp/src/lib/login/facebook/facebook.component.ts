import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BaseLoginProvider } from '../base/provider.base';
import { ILogin } from '../login';
import { LoginService } from '../login.service';
import { Subject } from 'rxjs/Subject';

declare const FB: any;

@Component({
  selector: 'lib-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})

export class FacebookComponent extends BaseLoginProvider implements ILogin, OnInit {

  public providerID: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public photoUrl: string;
  public token: any;
  public providerName: string = 'facebook';

  constructor(private service: LoginService) {
    super(service)
    FB.init({
      appId: '1820292001598094',
      status: false,
      cookie: false,
      xfbml: false,
      version: 'v3.0'
    });
  }

  disabled: boolean;

  ngOnInit() {
  }

  private async login() {
    // check the status first
    let status = await this.getStatus();

    // attempt login
    await this.run();
    this.success(this);
  }

  protected freeze(value: boolean) {
    // console.log('facebook==it worked');
    this.disabled = value;
  }

  change() {
    // console.log('loading hey from component');
    this.click();
  }

  // =====================================
  // methods of facebook
  // =====================================
  private getStatus(): Promise<string> {
    let result = new Subject<string>();
    FB.getLoginStatus((response) => {
      result.next(response.status);
      result.complete();
    });

    // return
    return result.asObservable().toPromise();
  }

  private async run(): Promise<void> {

    // create subject - this acts a medium to track login completion
    let task = new Subject<void>();

    try {

      // attempt to login
      await this.fbLogin()

      // if everyting is ok, attempt to get the profile data
      if (this.token == null) {
        task.error('unexpected error -- oauth token missing -- cannot get profile data from facebook');
      } else {
        await this.updateProfile(task);
      }
    }
    catch (error) {
      console.log(error);
    }

    // return
    return task.asObservable().toPromise();
  }

  private async fbLogin(): Promise<void> {

    // create subject - this acts a medium to track login completion
    let task = new Subject<void>();

    // lock other providers
    this.service.lock();

    // invoke facebook login
    FB.login(
      (response) => {
        if (response.authResponse != null) {
          this.token = response.authResponse.accessToken;
          console.log(this.token);

          task.complete();
        } else {
          this.cancelled();
          this.service.release();
          task.error('login operation failed/cancelled')
        }
      },
      {
        scope: 'public_profile, email',
        return_scopes: true
      }
    );

    // return
    return task.asObservable().toPromise();
  }

  private updateProfile(task: Subject<void>): void {

    FB.api('/me?fields=id,name,email,first_name,last_name,picture.height(500).width(500){url}',
      (response) => {
        this.providerID = response.id;
        this.firstName = response.first_name;
        this.lastName = response.last_name;
        this.email = response.email;
        this.photoUrl = response.picture.data.url;
        task.complete();
      }
    );
  }

  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      FB.getLoginStatus(function (response) {
        if (response && response.status === 'connected') {
          FB.logout(function (response) {
            resolve();
          });
        }
        else {
          reject();
        }
      });
    });
  }

}
