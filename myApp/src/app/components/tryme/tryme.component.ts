import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { showDialog, DialogboxButtons } from '../../../lib/dialog-box/dialogbox';

@Component({
  selector: 'app-tryme',
  templateUrl: './tryme.component.html',
  styleUrls: ['./tryme.component.css']
})

export class TryMeComponent implements OnInit {

  public restrictedResponse;
  public restrictedResponseError;
  public genericResponse;
  public dialogResult;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  async test() {
    this.dialogResult = await showDialog('TryMe', 'Are You Sure?', DialogboxButtons.OkCancel);
  }

  tryme() {
    this.tryGeneric();
    this.tryRestricted();
  }

  tryRestricted(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/restricted', '')
        .subscribe(
          res => {
            this.restrictedResponse = res;
            resolve();
          },
          err => {
            this.restrictedResponseError = 'Access denied';
            console.log('Restricted error: ', err);
          }
        );
    })
  }

  tryGeneric(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/generic', '')
        .subscribe(
          res => {
            this.genericResponse = res;
            resolve();
          },
          err => console.log('Generic error: ',err)
      );
    })
  }
}
