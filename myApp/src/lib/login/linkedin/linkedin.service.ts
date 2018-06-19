import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class LinkedinService {

  constructor(private router: Router, private http: Http) { }

  url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78ov5vlwhek3gu&redirect_uri=http%3A%2F%2Flocalhost:4200%2F&state=987654321&scope=r_basicprofile";

  obtainAuthCode() {
    let params = new URLSearchParams();
    let headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
    let options = new RequestOptions({ headers: headers });
    

    this.http.post(this.url, params.toString(), options)
      .map(res => res.json())
      .subscribe(
        data => console.log(data)
      );
  }
}
