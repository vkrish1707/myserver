import { Injectable } from "@angular/core";
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client";
// import * as hello from 'hellojs/dist/hello.all.js';
import * as Msal from 'msal';

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

    //Private members
    private access_token: any = null;
    private app: any;

    private config = {
        clientId: "8a013e7a-4c06-433d-a51c-d50680324d99",
        redirectUrl: "http://localhost:4200/",
        graphEndpoint: "https://graph.microsoft.com/v1.0/me",
        graphScopes: ["user.read", "email"]
    };

    //constructor
    constructor() {
        //intialising app and call back for login redirect
        this.app = new Msal.UserAgentApplication(
            this.config.clientId,
            '',
            () => { }); // call back for login redirect
    }

    //logIn method 
    // on success - returns a Promise with valid user token - which is retrieved from getToken method
    // on failure - returns a promoise with null user token
    public login() {
        return this.app.loginPopup(this.config.graphScopes)
            .then(idToken => {
                const user = this.app.getUser();
                this.email = user.displayableId;
                this.firstName = user.name;
                this.token = idToken;
                console.log('token ===', this.token );
                
                if (user) {
                    return this.getToken().then(token => token);
                } else {
                    return null;
                }
            }, () => {
                return null;
            });
    }

    public logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.app.logout();
        });
    }

    private getToken() {
        return this.app.acquireTokenSilent(this.config.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.config.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}
