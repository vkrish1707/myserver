import { Component, OnInit } from '@angular/core';
import { UserSessionService, IUserInfo } from '../../services/usersession.service';

@Component({
  selector: 'app-homewithsession',
  templateUrl: './homewithsession.component.html',
  styleUrls: ['./homewithsession.component.css']
})

export class HomewithsessionComponent implements OnInit {

  private info: IUserInfo;

  constructor(private session: UserSessionService) { }

  ngOnInit() {
    this.session.data.subscribe(info => this.info = info);  }

}
