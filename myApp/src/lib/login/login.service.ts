import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { BaseLoginProvider } from './base/provider.base';

@Injectable()
export class LoginService {

  private subjectFreeze: Subject<boolean> = new Subject<boolean>();
  public freeze: Observable<boolean> = this.subjectFreeze.asObservable();

  constructor() { }

  public release() {
    this.subjectFreeze.next(false);
  }

  public lock() {
    this.subjectFreeze.next(true);    
  }
}
