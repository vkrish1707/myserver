import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IUser } from '../models/user.model';

@Injectable()
export class UserSessionService {

  private userData: IUser[] = new Array<IUser>();

  public userDataSubject = new BehaviorSubject<any> ([
    {
      'firstName': 'Vamsi Krishna',
      'lastName': 'Mylavarapu',
      'email': 'mvamsikrishna2012@gmail.com',
      'contact': 7674837573,
      'image': 'https://scontent.fhyd2-1.fna.fbcdn.net/v/t1.0-9/16508300_857298014410599_6760406434650421939_n.jpg?_nc_cat=0&oh=ac55055bcf0c1c4a8b13b446826a422c&oe=5B94EB89',
    }
    ]);

  public user = this.userDataSubject.asObservable();

  constructor() {
    this.user.subscribe(data => this.userData = data);
  }

}
