import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/user.model';
import { UserSessionService } from '../../services/user-session.service';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css']
})
export class UseraccountComponent implements OnInit {

  private userDetails: IUser[];

  constructor(private userSessionService: UserSessionService) {
    this.userSessionService.user.subscribe(data => this.userDetails = data);
  }

  ngOnInit() {
  }

}
