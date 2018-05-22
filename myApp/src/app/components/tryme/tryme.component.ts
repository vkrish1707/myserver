import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

@Component({
  selector: 'app-tryme',
  templateUrl: './tryme.component.html',
  styleUrls: ['./tryme.component.css']
})
export class TryMeComponent implements OnInit {

  private restrictedResponse: any;
  private genericResponse: any;

  constructor(private session: UserSessionService, private http: HttpClient) { }

  ngOnInit() {
  }

  tryme() {
    this.tryRestricted();
    this.tryGeneric();
  }


  tryRestricted(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost:3000/api/restricted',)
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      resolve();
    })
  }

  tryGeneric(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('http://localhost:3000/api/generic',)
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      resolve();
    })

  }

  testSession1(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/restricted');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.restrictedResponse = xhr.response;
        console.log('response from api/restricted', this.restrictedResponse);
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
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) this.genericResponse = xhr.response;
        console.log('response from api/generic', this.genericResponse);
      };
      xhr.send();
      resolve();
    });
  }
}
