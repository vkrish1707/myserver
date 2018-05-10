import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';
import { EulaComponent } from './components/eula/eula.component';
import { HomewithsessionComponent } from './components/homewithsession/homewithsession.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressComponent } from '../lib/progress/progress.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "help", component: HelpComponent },
  { path: "register", component: RegisterComponent },
  { path: "homewithsession", component: HomewithsessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
