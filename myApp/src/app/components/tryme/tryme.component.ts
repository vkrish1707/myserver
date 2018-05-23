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

  public restrictedResponse : any;
  public genericResponse = 'response from generic';


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  tryme() {
    this.tryRestricted();
    this.tryGeneric();
  }

  tryRestricted(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/restricted', '')
        .subscribe(
          res => {
            this.restrictedResponse = res;
            console.log(this.restrictedResponse);
          },
         err => console.log(err)
        );
      resolve();
    })
  }

  tryGeneric(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/generic', '' )
        .subscribe(
          res => console.log(res),
          // err => console.log(err)
        );
      resolve();
    })

  }
}
