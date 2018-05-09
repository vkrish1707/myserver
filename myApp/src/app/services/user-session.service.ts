import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../models/user.model';
import { FacebookService } from '../../lib/login/facebook/facebook.service';

@Injectable()
export class UserSessionService {

  private userData: IUser[] = new Array<IUser>();

  public userDataSubject = new BehaviorSubject<any> ([
    {
      'firstName': 'Vamsi Krishna',
      'lastName': 'Mylavarapu',
      'email': 'mvamsikrishna2012@gmail.com',
      'contact': 7674837573,
      'image': "https://lookaside.facebook.com/platform/profilepic/?asid=1088405634633168&height=500&width=500&ext=1526038904&hash=AeS3Evkou-R4lyyh",
    }
    ]);

  public user = this.userDataSubject.asObservable();

  constructor(private facebook: FacebookService) {
    this.user.subscribe(data => this.userData = data);
  }

}
