import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';
import { HttpClient } from '@angular/common/http';
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

  tryme(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post('http://localhost:3000/api/restricted', '')
        .subscribe(
          data => console.log(data),
          err => console.log(err)
        );
      resolve();
    });    
  }

  tryRestricted() {

  }

  tryGeneric() {
    
  }
}
