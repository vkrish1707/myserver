import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { Http, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class LinkedinService {

  constructor(private router: Router, private http: Http) { }

  url = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78ov5vlwhek3gu&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fregister&state=987654321&scope=r_basicprofile";
  private lurl: string;

  obtainAuthCode() {
    let params = new URLSearchParams();
    let headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'Access-Control-Allow-Credentials': true
    });
    let options = new RequestOptions({ headers: headers });

    this.http.get(this.url, params.toString())
      .subscribe(
        data => {
          this.lurl = data.url
          console.log(this.lurl);
          window.open(this.lurl, 'targetWindow', 'width=650, height=650');
          
        }
      );
  }

  obtainAccesscode() {
    let params = new URLSearchParams();

    this.http.get(this.lurl, params.toString())
      .subscribe
  }
}
