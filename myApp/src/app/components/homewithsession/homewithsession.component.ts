import { Component, OnInit, Compiler, Output, EventEmitter } from '@angular/core';
import { UserSessionService, IUserInfo } from '../../services/usersession.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homewithsession',
  templateUrl: './homewithsession.component.html',
  styleUrls: ['./homewithsession.component.css']
})

export class HomewithsessionComponent implements OnInit {

  private info: IUserInfo;

  constructor(private session: UserSessionService, private router: Router, private complier: Compiler) { }

  ngOnInit() {
    this.session.data.subscribe(info => this.info = info);
  }

  signOut() {
    this.session.logOut();
    this.router.navigate(['/home']);
  }
}
