import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '../../services/usersession.service';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  constructor(private userSessionService: UserSessionService) {
  }

  ngOnInit() {
  }

}
