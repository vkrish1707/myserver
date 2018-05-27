import { Component, OnInit } from '@angular/core';
import { AppRegisterService } from '../../services/app-register.service';
import { ILogin } from '../../services/usersession.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  public state = 'login';

  constructor(private registerService: AppRegisterService, private router: Router) { }

  ngOnInit() {
  }

  public async loginSuccess(data: any) {
    this.registerService.data = <ILogin> data;
    await this.registerService.checkUser();
    this.state = 'register';
  }
}
