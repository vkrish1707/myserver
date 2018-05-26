import { Injectable } from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
import * as hello from 'hellojs/dist/hello.all.js';
// import * as Msal from 'msal';
import { ILogin } from "../login";
import { Subject } from "rxjs/Subject";

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
        appId: '1c2981ca-6ec8-40c0-9842-41ce9e8ddc01',
        scope: 'User.Read User.ReadBasic.All'
    };

    constructor() {}

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
            { redirect_uri: 'http://localhost:4200'}
        );
    }

    public async run(): Promise<void> {
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
                    console.log('logout successful');
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
                console.log('photo ==== ', JSON.stringify(res));
                task.complete();
            }))
    }
}
