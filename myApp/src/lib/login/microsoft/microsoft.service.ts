import { Injectable } from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
import * as hello from 'hellojs/dist/hello.all.js';
// import * as Msal from 'msal';

import { ILogin } from "../login";
import { environment } from '../../../environments/environment';
import { LoginService } from "../login.service";

@Injectable()
export class MicrosoftService implements ILogin {

    public providerID: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public photoUrl: string;
    public token: string;
    public providerName: string = 'microsoft';

    private config = {
        appId: environment.microsoft.appId,
        scope: environment.microsoft.scope
    };

    constructor(private service: LoginService) {}

    public initAuth() {
        hello.init({
                msft: {
                    id: this.config.appId,
                    oauth: {
                        version: 2,
                        auth: environment.microsoft.auth
                    },
                    scope_delim: ' ',
                    form: false
                },
            },
            { redirect_uri: environment.microsoft.redirect_uri}
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

            // release all providers
            this.service.release();
            
            console.log(error);
        }

        return task.asObservable().toPromise();
    }

    private async login(): Promise<void> {
        let task = new Subject<void>();

        await hello('msft').login({ scope: this.config.scope })
                .then( res => {
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
