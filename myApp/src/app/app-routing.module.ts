import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { HomewithsessionComponent } from './components/homewithsession/homewithsession.component';
import { RegisteruserconfirmComponent } from './components/registeruserconfirm/registeruserconfirm.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "help", component: HelpComponent },
  { path: "home", component: HomeComponent },
  { path: "register", component: RegisterComponent },
  { path: "signin", component: SignInComponent },
  { path: "homewithsession", component: HomewithsessionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
