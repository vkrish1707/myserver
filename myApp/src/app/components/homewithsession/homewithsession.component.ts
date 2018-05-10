import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';

@Component({
  selector: 'app-homewithsession',
  templateUrl: './homewithsession.component.html',
  styleUrls: ['./homewithsession.component.css']
})

export class HomewithsessionComponent implements OnInit {

  constructor(private session: UserSessionService) { }

  ngOnInit() {
  }

}
