import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, HttpInterceptor {

  private response1: any;
  private response2: any;

  constructor(private session: UserSessionService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return null

  }

  ngOnInit() {
  }

  // testSession1() {
  //   var headers = new Headers();
  //   let body = this.session.jwt;
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/api/restricted', body, {
      
  //   })
  //     .subscribe(
  //       data => { console.log(data); },
  //     );
  // }
  testSession1(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/restricted');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('jwt', this.session.jwt);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.response1 = xhr.response;
        console.log('response from api/restricted', this.response1);
      };
      xhr.send();
      resolve();
    });
  }


  testSession2(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/generic');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('jwt', this.session.jwt);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.response2 = xhr.response;
        console.log('response from api/generic', this.response2);
      };
      xhr.send();
      resolve();
    });
  }
}
